const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const expressJwt = require("express-jwt");

// Validation Login
const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
	});
	return schema.validate(data);
  };

// Logging In
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error)
      return res.status(400).send({ message: error });

    // Checking if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email " });
    console.log(user);
// Password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: " Password" });
    // Create and Assign a Token
	console.log('yeah')
	

    const token = user.generateAuthToken();
    console.log(token);
    res.status(200).send({ data: token, message: "logged in successfully" });
  
} catch (error) {
    res.status(500).send({ message: " Server Error" });
  }
});



module.exports = router;
