var express = require('express');
var aboutRouter = express.Router();
var db = require("../db");


aboutRouter.get('/', function (req, res) {
  res.render("about");
})

module.exports = aboutRouter; 