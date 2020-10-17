const passport = require("passport");

const User = require('./models/user.js');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        // To check if a user exist
        User.findOne({ platformId: profile.id }).then((currentUser) => {
            if (currentUser) {
                // User Found
                console.log("User is: " + currentUser);
                done(null, currentUser);
            }
            else {
                // User not found, Creating Database
                new User({
                    name: profile.displayName,
                    platformId: profile.id,
                    email: profile.emails[0].value,
                    pic: profile.photos[0].value

                }).save().then((newUser) => {
                    console.log("New user created" + newUser);
                    done(null, newUser);
                });
            }
        });
    }
));
