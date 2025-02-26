const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long !!!"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long !!!"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters long !!!"],
  },
  password: {
    type: String,
    required: true,
    // using select because we don't want to send this while finding the user
    select: false,
  },

  // socketId we will be using to get the live tracking of the driver or rider and we will be sharing it with the user
  socketId: {
    type: String,
  },
});

// creating some methods on the userSchema that we can use
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

//here we are creating a model using the above created schema
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
