/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const path = require('path');
const { dirname } = require('path');
const { getAccessEnv } = require('../../../helpers/env');

// urlpath for json file
const myRoot = dirname(require.main.filename);
const baseDir = path.join(myRoot, 'generated/');

module.exports = (req, res) => {
    if (`Bearer ${getAccessEnv()}` == req.headers.authorization) {
        fs.readFile(`${baseDir}${req.query.field}.json`, 'utf8', (err, jsonString) => {
            if (err) {
            // eslint-disable-next-line no-console
                console.log('File read failed:', err);
                res.status(500).json(err);
                return;
            }
            const response = JSON.parse(jsonString);
            res.status(200).json(response);
        });
    } else {
        res.status(403).json({ message: 'Token Invalid' });
    }
};
