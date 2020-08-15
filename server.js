
// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
require('dotenv').config()

const express = require("express");
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log("Mongoose is connected")
});

var User = require('./models/users');

var userRoute = require('./routes/users');
var bookRoute = require('./routes/books');
var transactionRoute = require('./routes/transactions');
var authRoute = require('./routes/auth');
var profileRoute = require('./routes/profile');
var cartRoute = require('./routes/cart');
var signUpRoute = require('./routes/signup')

var authMiddleware = require('./middlewares/auth');
var adminMiddleware = require('./middlewares/admin');
var sessionMiddleware = require('./middlewares/session')

const app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(sessionMiddleware);

app.get('/', async (req, res) => {
  res.render('index', {
    user : await User.findById(req.signedCookies.userId)
  });
});

app.use('/users', authMiddleware.requireAuth, adminMiddleware.adminRole, userRoute);
app.use('/books', bookRoute);
app.use('/transactions',authMiddleware.requireAuth, transactionRoute);
app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/cart', cartRoute);
app.use('/signup', signUpRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
