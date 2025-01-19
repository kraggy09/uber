const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const express = require("express");

const app = express();

// Properly initialize and use the CORS middleware
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    msg: "Working Perfectly!! Hello World",
  });
});

module.exports = app;
