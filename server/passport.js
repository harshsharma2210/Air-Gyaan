require('dotenv').config();

const passport = require("passport");
const User = require('./models/user.js');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// PASSPORT JWT

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
}
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload);
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

// GOOGLE
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

// FACEBOOK
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        // To check if a user exist
        User.findOne({ email: profile.emails[0].value }).then((currentUser) => {
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

// LINKEDIN

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.LINKEDIN_CALLBACK_URL,
    scope: ['r_emailaddress', 'r_liteprofile'],
}, function (token, tokenSecret, profile, done) {
    // To check if a user exist
    User.findOne({ email: profile.emails[0].value }).then((currentUser) => {
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
