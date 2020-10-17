const result = require("dotenv").config();

if (result.error) {
  throw result.error
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const postRoute = require('./routes/posts');
const User = require('./models/user.js');

require('./passport')
// PASSPORT SETUP
const passport = require("passport");
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
// MONGOOSE SETUP
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use('/posts', postRoute);


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect(process.env.FRONTEND_URL);
  });

app.listen(PORT, function () {
  console.log('Server is running on Port:', PORT);
});