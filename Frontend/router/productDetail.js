var express = require("express");
var productDetailRouter = express.Router();
var db = require("../db");

var bodyparser = require('body-parser');

productDetailRouter.use(bodyparser.json()); // 使用bodyparser中介軟體，
productDetailRouter.use(bodyparser.urlencoded({ extended: true }));

productDetailRouter.get("/", function (req, res) {
  let productInformation = {};
  // let productName = $('').val();
  // console.log(productName)
  db.queryAsync(`SELECT productInfo FROM product WHERE productTitle ="test2"`, function (error, rows) {
    res.render("productDetail", {
      productInformation: rows[0]
    })
  })
    .then(category => {
      productInformation = category;
      res.render("productDetail", {
        productInformation: productInformation
      })
      console.log(productInformation);
    })
    .catch(err => {
      console.log(err)
    })
})

//點選購物車按鈕
productDetailRouter.post("/cartDetailClick", function (req, res) {
  console.log(req.body.productIitle);
  console.log(req.body.productNum);
  db.query(`SELECT productId FROM product WHERE productTitle ="${req.body.productIitle}"`, function (error, rows) {
    if(error){
      console.log(error);
    }else{
      db.query(`INSERT INTO cartlist (memberId, productId, productNum) VALUES ('${req.session.username}', ${rows[0].productId}, ${req.body.productNum});`, function (error, rows) {
        if (error) {
          console.log(error);
        }
      })
      res.json({
        username: req.session.username
      })
    }
  })
})


module.exports = productDetailRouter;