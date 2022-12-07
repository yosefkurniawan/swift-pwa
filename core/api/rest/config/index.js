/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const { getAppEnv, getAccessEnv } = require('../../../helpers/env');
const { getStoreHost } = require('../../../helpers/config');

module.exports = (req, res) => {
    const appEnv = getAppEnv();
    if (getAccessEnv() == req.headers.authorization) {
        fs.readFile('./core/api/rest/config/config.json', 'utf8', (err, jsonString) => {
            if (err) {
            // eslint-disable-next-line no-console
                console.log('File read failed:', err);
                res.status(500).json(err);
                return;
            }
            res.status(200).json(JSON.parse(jsonString));
        });
    } else {
        window.location.replace(
            getStoreHost(appEnv || 'prod'),
        );
    }
};
