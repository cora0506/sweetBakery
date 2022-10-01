var express = require("express");
var classesRouter = express.Router();
var db = require("../db");

classesRouter.get("/", function (req, res) {
  let classInfo = {};
  db.queryAsync(`SELECT c.classTitle, c.classInfo, t.startDate, t.startTime, t.remain FROM classList c JOIN classTime t ON(t.classId = c.classId)`)
  res.render("classes");
})

module.exports = classesRouter;