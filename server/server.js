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
const postRoute = require('./routes/posts');
const User = require('./models/user.js');
const configureRoutes = require('./routes');

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
mongoose.connect(process.env.MONGO_DB || config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// const apiPrefix = process.env.API_PREFIX || "/api";
// /* ADD HERE THE PAIRS: route => handler */
// const apiRoutes = [
//   'posts', postRoute
// ];
// for (let i = 0; i < apiRoutes.length; i += 2) {
//   app.use(`${apiPrefix}/${apiRoutes[i]}`, apiRoutes[i + 1]);
// }

configureRoutes(app, process.env.API_PREFIX || "/api");

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect(process.env.FRONTEND_URL);
  });

const serverPort = process.env.PORT || 3000;
app.listen(serverPort, function () {
  console.log('Server is running on Port:', serverPort);
});
