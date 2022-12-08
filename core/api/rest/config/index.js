/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const { getAccessEnv } = require('../../../helpers/env');

module.exports = (req, res) => {
    if (`Bearer ${getAccessEnv()}` == req.headers.authorization) {
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
        res.status(403).json({ message: 'Token Invalid' });
    }
};
