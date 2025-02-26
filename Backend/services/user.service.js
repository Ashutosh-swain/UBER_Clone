// Here we are creating a userservice that will directly interact with the mongodb database for performing different actions

const userModel = require("../models/user.model");

// we are creating different methods for interacting with the database
module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};
