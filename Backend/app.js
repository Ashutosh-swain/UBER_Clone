// importing the dotenv and and configuring it so that we can use the environmental variable everywhere
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

// importing cors and for now we are not providing any domain so we will be accepting the request from all websites but in production we will be providing the domain from only which requests will be accepted
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("The server is running fine!!!");
});

module.exports = app;
