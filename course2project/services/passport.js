const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const routes = require('../config/routes');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientId,
            clientSecret: keys.googleClientSecret,
            callbackURL: routes.AUTH_GOOGLE_CALLBACK,
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            let user = await User.findOne({googleId: profile.id});

            if (!user) {
                user = await new User({googleId: profile.id}).save();
            }
            done(null, user);
        }
    )
);
