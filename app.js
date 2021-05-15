const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const registerRouter = require('./routes/auth/register')
const loginRouter = require('./routes/auth/login')
const logoutRouter = require('./routes/auth/logout')
const productActionRouter = require('./routes/products/actions')
const customerFundsRouter = require('./routes/customer/funds')
const productsViewRouter = require('./routes/products/view')
const customerCartRouter = require('./routes/customer/carts')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
})

app.options('*', (req, res) => {
  res.json({
    status: 'OK'
  });
});


// Routes
app.use('/', indexRouter);
app.use('/api/auth/register', registerRouter)
app.use('/api/auth/login', loginRouter)
app.use('/api/auth/logout', logoutRouter)
app.use('/api/products/actions', productActionRouter)
app.use('/api/customer/funds', customerFundsRouter)
// app.use('/api/products/view', productsViewRouter)
app.use('/api/customer/cart', customerCartRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error status code
  res.status(err.status || 500).end();
});

module.exports = app;
