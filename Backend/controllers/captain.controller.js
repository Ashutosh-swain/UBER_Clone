//// All the actions on captain model(Table) will be handled here

// importing the captain model(table) where we will be performing the actions
const captainModel = require("../models/captain.model");

// importing the captain service for performing the actions on captain database
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
// Importing the blacklistTokenModel for storing the token in the blacklisttoken database when the captain logouts
const blacklistTokenModel = require("../models/blacklistToken.model");

// below code is for registering the captain
module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await captainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "Captain already exist" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();

  res.status(201).json({ token, captain });
};

// below code is for login the captain
module.exports.loginCaptain = async (req, res, next) => {
  // below code will check for the validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // we will be checking whther the captain is present in the database or not with the email

  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  // After finding the captain from the database we will generate the jwt token
  const token = captain.generateAuthToken();
  // after generating the jwt token we will set it in cookies
  res.cookie("token", token);

  res.status(200).json({ token, captain });
};

// below code is for getting the captain profile
module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain);
};

//// below code is for logout the captain
module.exports.logoutCaptain = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await blacklistTokenModel.create({ token });

  res.status(200).json({ message: "Logout successfully" });
};
