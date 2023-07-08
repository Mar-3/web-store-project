const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const db = require('./config/database');
const session = require('express-session');

// import routes for users and orders
const users = require('./routes/users');
const orders = require('./routes/orders');
const products = require('./routes/products');

// Set port
const PORT = process.env.PORT || 8080;

// Set mongoose to use global Promise
mongoose.Promise = global.Promise;

// Connect to database using MongoURI
mongoose.connect(
  db.MongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } 
).catch((err) => {
  throw err;
});
const database = mongoose.connection;
database.on("error", console.error.bind(console, "connection failed: "));
database.once("open", () => console.log('Connected to the database successfully.'));


const app = express();

// CORS Middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(session({
    secret: db.secret,
    saveUninitialized: true,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/orders', orders);
app.use('/products', products);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});