var express = require("express");
var passwordUpdateRouter = express.Router();
var db = require("../db");

var session = require('express-session');
var bodyparser = require('body-parser');


passwordUpdateRouter.use(bodyparser.json()); // 使用bodyparder中介軟體，
passwordUpdateRouter.use(bodyparser.urlencoded({ extended: true }));

passwordUpdateRouter.get("/", function (req, res) {
  res.render("passwordUpdate");
})


passwordUpdateRouter.post('/passwordUpdate', function (req, res) {
  db.query(`SELECT * FROM member WHERE memberId = "${req.session.username}"`, function (error, rows) {
    if (currentPassword == rows[0].userPassword) { //比對目前密碼
      if (req.body.newPassword == req.body.confirmPassword) { //比對密碼驗證
        db.query(`UPDATE member SET userPassword="${req.body.newPassword}" WHERE memberId = "${req.session.username}"`, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            res.render('passwordUpdate');
          }
        });
      };
    }
    res.redirect('user');
  });
});
module.exports = passwordUpdateRouter;