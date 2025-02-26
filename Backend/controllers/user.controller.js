// All the actions on user model will be handled here

const userModel = require("../models/user.model");
// importing the user service for performing the actions on user database
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  console.log(req.body);

  const { fullname, email, password } = req.body;

  // coverting the plain password into hashpassword and storing it in the database
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  //Calling the function for creating the jwt token
  const token = await user.generateAuthToken();

  res.status(200).json({ token, user });
};
