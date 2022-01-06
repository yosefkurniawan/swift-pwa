const qs = require('querystring');
const { getAppEnv } = require('../../helpers/env');
import { recaptchaConfig } from '@services/graphql/schema/config';
import graphRequest from '@graphql_request';

module.exports = async (req, res) => {
    let secret;
    const { response } = req.body;
    const appEnv = await getAppEnv();
    const getRecaptcha = await graphRequest(recaptchaConfig);

    if(appEnv === 'local') {
        secret = getRecaptcha?.storeConfig.pwa.recaptcha_server_key_local;
    }
    else if(appEnv === 'dev') {
        secret = getRecaptcha?.storeConfig.pwa.recaptcha_server_key_dev;
    }
    else if(appEnv === 'stage') {
        secret = getRecaptcha?.storeConfig.pwa.recaptcha_server_key_stage;
    }
    else if(appEnv === 'prod') {
        secret = getRecaptcha?.storeConfig.pwa.recaptcha_server_key_prod;
    }

    await fetch('https://www.google.com/recaptcha/api/siteverify', {
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
