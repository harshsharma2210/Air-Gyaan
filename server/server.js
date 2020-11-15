const result = require("dotenv-flow").config();

if (result.error) {
  throw result.error
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const User = require('./models/user.js');
const configureRoutes = require('./routes');

require('./passport');
 
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
mongoose.connect(process.env.MONGO_DB || config.DB, { useNewUrlParser: true ,useUnifiedTopology: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* LOAD ROUTES DIRECTORY */
configureRoutes(app, process.env.API_PREFIX || "/api");

/*CALLBACK*/

// SIGNIN TOKEN
const signToken = (user) => {
    return JWT.sign({ id: user._id, name: user.name, email: user.email, pic: user.pic }, process.env.JWT_KEY, { expiresIn: 86400 * 7 });
}

// GOOGLE CALLBACK
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    // Successful authentication, redirect success.
    const token = signToken(req.user);
    res.redirect(process.env.FRONTEND_URL);
  }
);

// FACEBOOK CALLBACK
app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/error' }),
  function (req, res) {
    // Successful authentication, redirect success.
    const token = signToken(req.user);
    res.redirect(process.env.FRONTEND_URL);
  }
);

// LINKEDIN CALLBACK
app.get('/auth/linkedin', passport.authenticate('linkedin', {
  scope: ['r_emailaddress', 'r_liteprofile'],
}));

app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    failureRedirect: '/error'
  }),
  function (req, res) {
    // Successful authentication, redirect success.
    const token = signToken(req.user);
    res.redirect(process.env.FRONTEND_URL);
  }
);


const serverPort = process.env.PORT || 3000;
app.listen(serverPort, function () {
  console.log('Server is running on Port:', serverPort);
});
