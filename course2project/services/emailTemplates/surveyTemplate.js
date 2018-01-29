const keys = require('../../config/keys');
const routes = require('../../config/routes');
// const { keys, routes } = require('../../config');

module.exports = (survey) => {
    return `
        <html>
            <body>
                <div style="text-align: center;">
                    <h3>Id like Your input.</h3>
                    <p>Please answer the following question: </p>
                    <p>${ survey.body }</p>
                    <div>
                        <a href="${ keys.redirectDomain + routes.API_SURVEYS + '/' + survey.id + '/yes'}">Yes</a>
                    </div>
                    <div>
                        <a href="${ keys.redirectDomain + routes.API_SURVEYS + '/' + survey.id + '/no'}">No</a>
                    </div>
                </div>
            </body>
        </html>
    `;
};
