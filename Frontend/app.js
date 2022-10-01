var express = require("express");
var session = require('express-session');
var app = express();
var loginRouter = require('./router/login');
var homeRouter = require('./router/home');
var checkoutRouter = require('./router/checkout');
var cartRouter = require('./router/cart');
var classesRouter = require('./router/classes');
var classDetailRouter = require('./router/classDetail');
var classFormRouter = require('./router/classForm');
var passwordUpdateRouter = require('./router/passwordUpdate');
var productsRouter = require('./router/products');
var productDetailRouter = require('./router/productDetail');
var registeredRouter = require('./router/registered');
var userRouter = require('./router/user');
var orderHistoryRouter = require('./router/orderHistory');
var ordersRouter = require('./router/orders');
var aboutRouter = require('./router/about');
app.listen(3000);
app.use(session({
  secret: 'sweetbakery',
  resave: true,
  saveUninitialized: true,
  cookie: {
    //maxAge: true//1000 * 60 * 3 //100秒後過期
  }
}))
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/login', loginRouter);
app.use('/', homeRouter);
app.use('/checkout', checkoutRouter);
app.use('/cart', cartRouter);
app.use('/classes', classesRouter);
app.use('/classDetail', classDetailRouter);
app.use('/classForm', classFormRouter);
app.use('/passwordUpdate', passwordUpdateRouter);
app.use('/products', productsRouter);
app.use('/productDetail', productDetailRouter);
app.use('/registered', registeredRouter);
app.use('/user', userRouter);
app.use('/orderHistory', orderHistoryRouter);
app.use('/orders', ordersRouter);
app.use('/about', aboutRouter);

