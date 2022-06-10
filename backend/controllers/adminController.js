const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Admin = require("../models/adminModel.js");
require("dotenv").config();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Register an admin
exports.registerAdmin = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = Admin.create(req.body);

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  const token = admin.getJWTToken();

  res.status(201).json({
    success: true,
    token,
  });
});

// LOGIN admin
exports.loginAdmin = catchAsyncErrors(async (req, res, next) => {
  const email = req.body.email;
  Admin.findOne({ email: email }).then(function (adminData) {
    if (adminData === null) {
      return res.json({ message: "Invalid Login Credentials!" });
    }
    ////////now it means it is valid
    const password = req.body.password;
    bcryptjs.compare(password, adminData.password, function (err, result) {
      if (result === false) {
        return res.json({ message: "Invalid login Credentials!" });
      }

      const token12 = jwt.sign({ userId: adminData._id }, "mysecretkey");
      res.send({ token: token12, message: "Login success" });

      console.log;
    });
  });
});

// GET admin details
exports.getAdminDetails = catchAsyncErrors(async (req, res, next) => {
  const admin = await Admin.findById(req.params.id);

  if (!admin) {
    return next(new ErrorHander("User not found", 404));
  }
  res.status(200).json({
    success: true,
    admin,
  });
});

// DELETE a user
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }
  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

// LOGOUT USER
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// FORGOT PASSWORD

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const admin = await Admin.findOne({
    email: req.body.email,
  });

  if (!admin) {
    return next(new ErrorHander("User not found", 404));
  }

  // get reset password token
  const resetToken = user.getResetPasswordToken();

  await admin.save({ validateBeforeSave: false });

  const resetPasswordUrl = `http://localhost/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n \n ${resetPasswordUrl} \n \n If you have not requested this email then 
  please ignore it`;

  try {
    await sendEmail({
      email: admin.email,
      subject: `Ecommerce Passwrod recovery `,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    admin.ResetPasswordToken = undefined;
    admin.ResetPasswordTokenExpire = undefined;
    await admin.save({ validateBeforeSave: false });
    return next(new ErrorHander(error.message, 500));
  }
});
