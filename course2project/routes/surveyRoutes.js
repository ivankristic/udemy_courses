const _ = require('lodash');
const mongoose =  require('mongoose');
const Path = require('path-parser');
const { URL } = require('url');

const routes = require('../config/routes');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get(routes.API_SURVEYS, requireLogin, async (req, res) => {
        const userSurveys = await Survey.find({
            _user: req.user.id
        })
            .select({
                recipients: false
            });

        res.send(userSurveys);
    });

    app.post(routes.API_SURVEYS, requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(
                email => ({ email: email.trim() })
            ),
            _user: req.user.id,
            dateSent: Date.now(),
        });

        const mailer = new Mailer(
            survey,
            surveyTemplate(survey)
        );
        try {
            await mailer.send();
            await survey.save();

            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.get(routes.API_SURVEYS_RESPONSE, (req, res) => {
        res.send('Thanks for voting.');
    });

    app.post(routes.API_SURVEYS_WEBHOOKS, (req, res) => {
        const p = new Path(routes.API_SURVEYS_RESPONSE);
        _.chain(req.body)
            .map(({ url, email, event }) => {
                const match = p.test(new URL(url).pathname);
                if (match && event === 'click') {
                    return {
                        email,
                        surveyId: match.surveyId,
                        choice: match.choice
                    }
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: {
                            email: email,
                            responded: false
                        }
                    }
                }, {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    'lastResponded': Date.now()
                }).exec();
            })
            .value();

        res.send({});
    });
};
