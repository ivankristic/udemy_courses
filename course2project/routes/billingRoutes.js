const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
const routes = require('../config/routes');

module.exports = app => {
    app.post(routes.API_STRIPE, requireLogin, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
        req.user.credits += 5;

        const user = await req.user.save();

        res.send(user);
    });
};
