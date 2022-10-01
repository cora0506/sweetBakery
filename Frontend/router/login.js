var express = require("express");
var loginRouter = express.Router();
var db = require("../db");
var app = express();

var bodyparser = require('body-parser');

var compareEmail = 0; // 比對email狀態 1 = true

loginRouter.use(bodyparser.json()); // 使用bodyparder中介軟體，
loginRouter.use(bodyparser.urlencoded({ extended: true }));

var moment = require("moment");
app.locals.moment = require("moment");

//會員狀態
loginRouter.post('/userCurrentCondition', function(req, res){
    console.log(req.session.username);
    res.json({
        userCondition : req.session.username
    })
})

//會員註冊
loginRouter.post('/memberRegister', function (req, res) {
    compareEmail = 2; //初始
    db.query(`SELECT * FROM member`, function (err, rows) {  //抓資料
        rows.forEach(item => {
            if (item.email == req.body.email) {
                //帳號已存在
                compareEmail = 0;
            }
        })
        //將資料存入資料庫
        if (compareEmail == 2) {
            //比對密碼
            if (req.body.password == req.body.checkPassword) {
                //可以註冊帳號
                db.query(`INSERT INTO member (memberId, email, userPassword, userName,  userPhone, userBirthday, fb, google) VALUES ('${req.body.email}', '${req.body.email}','${req.body.password}', '${req.body.name}','${req.body.phone}','${req.body.birthday}','','')`, (error, rows) => {
                    if (error) {
                        console.log(error);
                    }
                    console.log('帳號註冊成功');
                    req.session.username = req.body.email;  //存在session.username
                    //帳號註冊成功
                    compareEmail = 2
                    res.json({
                        data: compareEmail
                    })
                })
            } else {
                //密碼比對錯誤
                compareEmail = 1;
                res.json({
                    data: compareEmail
                });
            }
        } else if (compareEmail == 0) {
            //帳號已存在
            res.json({
                data: compareEmail
            });
            console.log('密碼不相符');
        };
    });
})

//會員登入
loginRouter.post('/memberLogin', function (req, res) {
    if (req.session.username) {  //判斷session暫存資料有無
        db.query(`SELECT * FROM member WHERE memberId = "${req.session.username}"`, function (error, rows) {
            userCondition = 2;
            if (error) {
                console.log(error);
            } else {
                res.json({
                    user: rows[0],
                    data: userCondition //帳號登入
                })
            }
        });
    } else {
        db.query(`SELECT * FROM member`, function (error, rows) {  //抓資料
            let user;  //使用者資訊
            let userCondition = 0;  //登入狀態
            rows.forEach(item => {
                if (req.body.email == item.email) {
                    if (req.body.password == item.userPassword) {
                        user = item;
                        req.session.username = req.body.email;   //取得前端資料，並寫入至後端session暫存
                        userCondition = 2;  //可登入   
                    } else {
                        userCondition = 1; //密碼錯誤
                    };
                };
            });
            if (userCondition == 2) { //登入成功
                console.log('登入成功');
                res.json({
                    user: user,
                    data: userCondition //帳號登入
                })
            } else if (userCondition == 1) {
                console.log('密碼錯誤')
                res.json({
                    data: userCondition //密碼錯誤
                });
            } else if (userCondition == 0) {
                console.log('帳號不存在')
                res.json({
                    data: userCondition //帳號不存在
                })
            }
        });
    }
})


//忘記密碼
loginRouter.post('/memberForgetPassword'), function (req, res) {
    console.log(req.session.username);
    if (req.session.username) {
        db.query(`SELECT * FROM member WHERE memberId = "${req.session.username}"`, function (error, rows) {
            console.log(rows);
        });
    }
}

// 獲取主頁
// loginRouter.get('/', function (req, res) {

//     if (req.session.username) { //判斷session 狀態，如果有效，則返回主頁，否則轉到登入頁面
//         res.render('user', { username: req.session.username });
//     } else {
//         res.redirect('/');
//     }
// })
// 退出
loginRouter.post('/logout', function (req, res) {
    req.session.username = null; // 刪除session
    res.json({
        data: req.session.memberLoginEmail
    });
});


module.exports = loginRouter;