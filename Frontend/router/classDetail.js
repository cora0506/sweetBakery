var express = require('express');
var classDetailRouter = express.Router();
var db = require("../db");

classDetailRouter.get("/", function (req, res) {

  res.render("classDetail")
})

module.exports = classDetailRouter;