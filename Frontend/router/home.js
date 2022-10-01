var express = require("express");
var homeRouter = express.Router();
var db = require('../db');

homeRouter.get("/", function (req, res) {
  let productInformation = {};
  let productCategory = {};
  let productPic = {};
  // res.render('products');
  db.queryAsync("SELECT c.categoryId, p.productId, p.productTitle, p.productPrice, c.categoryName, size.sizeName FROM product p JOIN productcategory c ON(c.categoryId = p.categoryId) JOIN productsize size ON(size.sizeId = p.sizeId) WHERE p.productStatus ='上架中' LIMIT 0,6")
    .then(category => {
      productInformation = category;
      return db.queryAsync('SELECT * FROM productCategory');
    })
    .then(productCat => { // 接SELECT * FROM productCategory資料
      productCategory = productCat;
      return db.queryAsync('SELECT * FROM productimg');
    })
    .then(productImage => {
      productPic = productImage
      res.render('index', {
        productInformation: productInformation,
        productCategory: productCategory,
        productPic: productPic
      })
    })
    .catch(err => {
      console.log(err)
    })

});

module.exports = homeRouter;