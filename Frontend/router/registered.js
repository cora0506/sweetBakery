var express = require("express");
var registeredRouter = express.Router();
var db = require('../db');

registeredRouter.get("/", function (req, res) {
  res.render("registered")
})

module.exports = registeredRouter;