var express = require("express");
var classFormRouter = express.Router();
var db = require("../db");

classFormRouter.get("/", function (req, res) {
  res.render("classForm")
})

module.exports = classFormRouter;