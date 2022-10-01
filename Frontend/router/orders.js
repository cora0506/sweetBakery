var express = require("express");
var ordersRouter = express.Router();
var db = require('../db');

ordersRouter.get('/', function (req, res) {
  let productInformation = {};
  let productPic = {};
  // req.session.username
  db.queryAsync(`SELECT c.*, p.*,s.sizeName,(p.productPrice*c.productNum) AS subTotal FROM cartlist c JOIN product p ON(c.productId=p.productId) JOIN productsize s ON(p.sizeId=s.sizeId) WHERE c.memberId="${req.session.username}"`)
    .then(category => {
      productInformation = category;
      // console.log(category);
      return db.queryAsync('SELECT * FROM productimg');
    }).then(productImage => {
      productPic = productImage
      // console.log(productInformation);
      res.render("orders", {
        productInformation: productInformation,
        productPic: productPic
      })
    })
    .catch(err => {
      console.log(err)
    })
})


module.exports = ordersRouter;