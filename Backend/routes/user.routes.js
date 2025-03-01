// Here we will be creating all the routes for user
const express = require("express");
const router = express.Router();

// importing the express-validator package and using it for performing validation on the data we reaciev from frontend
const { body } = require("express-validator");

const userController = require("../controllers/user.controller");

// importing the authorization middleware that we created
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email !!!"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long !!!"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long !!!"),
  ],
  userController.registerUser
);

router.post("/login", [
  body("email").isEmail().withMessage("Invalid Email !!!"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long !!!"),
  userController.loginUser,
]);

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

router.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
