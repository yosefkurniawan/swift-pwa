const qs = require('querystring');
const { recaptcha } = require('../../../swift.config');

module.exports = (req, res) => {
    const { response } = req.body;
    const appEnv = typeof window !== 'undefined' ? window.APP_ENV : process.env.APP_ENV;
    const secret = recaptcha.serverKey[appEnv] || recaptcha.serverKey.prod;
    fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'post',
        body: qs.stringify({
            response,
            secret,
        }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
        .then((data) => data.json())
        .then((json) => {
            res.status(200).json(json);
        })
        .catch((err) => res.status(500).json(err));
};
