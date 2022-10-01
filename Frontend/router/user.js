var express = require("express");
var userRouter = express.Router();
var db = require('../db');
var app = express();
var bodyparser = require('body-parser');

userRouter.use(bodyparser.json()); // 使用bodyparder中介軟體，
userRouter.use(bodyparser.urlencoded({ extended: true }));

var moment = require("moment");
app.locals.moment = require("moment");

//讀取頁面
userRouter.get("/", function (req, res) {
  console.log('-------------------');
  console.log(req.session.username);
  if (req.session.username) { //如果是登入的狀態的話
    db.query(`SELECT * FROM member WHERE email = "${req.session.username}"`, function (error, rows) {
      console.log(rows[0]);
      if (error) {
        console.log(error);
      } else {
        res.render("user", {
          // 會員帳號
          userAcount: rows[0],
          // 會員姓名
          userName: rows[0],
          // 信箱
          userEmail: rows[0],
          // 電話
          userPhone: rows[0],
          // 生日
          userBirthday: rows[0],
          //轉換時間格式
          moment
        });
      };
    })
  }
})


//修改個人資料
userRouter.post('/changeUserInfoContainer', function (req, res) {
  db.query(`UPDATE member SET userName="${req.body.userName}", userPhone="${req.body.userPhone}" WHERE memberId = "${req.session.username}"`, function (error, rows) {
    if (error) {
      throw error;
    }
  });
  db.query(`SELECT * FROM member WHERE memberId = "${req.session.username}"`, function (error, rows) {
    if (error) {
      throw error;
    } else {
      let user = rows[0];
      setTimeout(() => {
        res.render("user", {
          // 會員帳號
          userAcount: user,
          // 會員姓名
          userName: user,
          // 信箱
          userEmail: user,
          // 電話
          userPhone: user,
          // 生日
          userBirthday: user,
          //生日格式轉換
          moment
        });
      }, 2000);
    };
  })


});

//更改密碼
userRouter.post('/passwordUpdate', function (req, res) {
  console.log(req.body.newPassword);

  // db.query(`SELECT * FROM member WHERE email = "${req.session.username}"`, function (error, rows) {
  db.query(`UPDATE member SET userPassword="${req.body.newPassword}" WHERE memberId = "${req.session.username}"`, function (error, rows) {
    let user = rows[0];
    setTimeout(() => {
      req.session.username = null;
      res.render('index');
    }, 2000);
  })
  // })
})




module.exports = userRouter;