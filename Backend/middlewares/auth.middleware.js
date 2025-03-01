// here we will create a middleware that will check which user is logged in and if that users data is present in the database it will show his profile on the profile page and if user is not found then will show an error message:Unauthorized access
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blacklistToken.model");

// we have created the below middleware to check whether the user is authenticated or not
module.exports.authUser = async (req, res, next) => {
  // basically tokens are stored in header or cookies .so we will be finding the token in both
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  // checking whther the token is blacklisted or not
  const isBlacklisted = await blackListTokenModel.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  // If token is found then we will be decoded it
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // here we will be getting the same data that we used for creating the token when user registered
    const user = await userModel.findById(decoded._id);

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
};
