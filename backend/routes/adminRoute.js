const express = require("express");
const {
  registerAdmin,
  getAdminDetails,
  deleteUser,
  loginAdmin,
  logout,
  forgotPassword,
} = require("../controllers/adminController");
const router = express.Router();

router.route("/register").post(registerAdmin);

router.route("/login").post(loginAdmin);

router.route("/admin/:id").get(getAdminDetails);

router.route("/deleteuser/:id").delete(deleteUser);

router.route("/passowrd/forgot").post(forgotPassword);

router.route("/logout").get(logout);

router.route("/register").post();

module.exports = router;
