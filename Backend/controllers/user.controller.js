// All the actions on user model(Table) will be handled here

const userModel = require("../models/user.model");
// importing the user service for performing the actions on user database
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

// below code is for registering the user
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

// below code is for login the user
module.exports.loginUser = async (req, res, next) => {
  // below code will check for the validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { email, password } = req.body;
  // we will be checking whther the user is present in the database or not with the email
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = await user.generateAuthToken();

  // after generating the jwt token we will set it in cookies

  res.cookie("token", token);

  res.status(200).json({ token, user });
};

// below code is for getting the user profile
module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

// below code is for logout the user
module.exports.logoutUser = async (req, res, next) => {
  // clearing the cookie
  res.clearCookie("token");
  // finding the token from the header or cookies and blacklisting it
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blacklistTokenModel.create({ token });

  res.status(200).json({ message: "Logged out successfully" });
};
