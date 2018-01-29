const passport = require('passport');
const routes = require('../config/routes');

module.exports = app => {
    app.get(
        routes.AUTH_GOOGLE,
        passport.authenticate(
            'google',
            {
                scope: ['profile', 'email']
            }
        )
    );

    app.get(
        routes.AUTH_GOOGLE_CALLBACK,
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get(
        routes.API_LOGOUT,
        (req, res) => {
            req.logOut();
            res.redirect('/');
        }
    );

    app.get(
        routes.API_CURRENT_USER,
        (req, res) => {
            res.send(req.user);
        }
    );
};
