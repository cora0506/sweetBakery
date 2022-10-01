var express = require("express");
var orderHistoryRouter = express.Router();
var db = require('../db');

orderHistoryRouter.get("/", function (req, res) {
  res.render("orderHistory")
})

module.exports = orderHistoryRouter;