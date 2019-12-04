
/** EXTERNAL DEPENDENCIES */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

/** ROUTERS */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordsRouter = require('./routes/records');
const ordersRouter = require('./routes/orders');

/** OUR MIDDLEWARE */ 
const { setCors } = require("./middleware/security");

/** INIT */
const app = express();

/** LOGGING */
app.use(logger('dev'));

/** CONNECT TO MONGO*/
mongoose.connect( "mongodb://localhost:27017/record_shop_DB" ,{
useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology: true
})

mongoose.connection.on("error", console.error);
mongoose.connection.on('open', () => {
    console.log("Connected to the Database...")
})

/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(setCors);

/** STATIC FILES*/
app.use(express.static(path.join(__dirname, 'public')));

// const validationRules = () => {
//   // return [check('username').isEmail(),check('password').isLength({ min: 5 })]
//   return [
//     body('email')
//     .isEmail()
//     .normalizeEmail()
//     .exists()
//     .withMessage('Do you call this an email?'),
//     body('password')
//     .isLength({min: 10})
//     .withMessage('Your password should be 10 characters long'),
//     body('firstName').trim(),
//     body('lastName').trim()
//   ]
// }
/** ROUTES */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/records', recordsRouter);
app.use('/orders', ordersRouter);
/** ERROR HANDLING */

app.use(function(req, res, next) {
    const err = new Error('Looks like something is broken...');
    next(err);
  });
  
  app.use(function(err, req, res, next) {
    res.status(400).send({
      error: {
        message: err.message
      }
    });
  });
  

/** EXPORT PATH */
module.exports = app;

app.port = 3004;
app.listen(3004, process.env.IP, function () {
    console.log("SERVER IS RUNNING");
})