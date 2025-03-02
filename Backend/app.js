// importing the dotenv and and configuring it so that we can use the environmental variable everywhere
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

// Importing the user route
const userRoutes = require("./routes/user.routes");

// Importing the captain route
const captainRoutes = require("./routes/captain.routes");

// importing cors and for now we are not providing any domain so we will be accepting the request from all websites but in production we will be providing the domain from only which requests will be accepted
const cors = require("cors");
const app = express();

// importing the cookie-parser middleware for interacting with cookies on the server
const cookieParser = require("cookie-parser");

// importing and connecting to the database
const connectToDb = require("./db/db");
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("The server is running fine!!!");
});

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

module.exports = app;
