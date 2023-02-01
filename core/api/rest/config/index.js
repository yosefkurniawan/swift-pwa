/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const { getAccessEnv, getAppEnv, getEncryptEnv } = require('../../../helpers/env');
const { HOST } = require('../../../../swift.config');

const appEnv = getAppEnv();
const url = HOST[appEnv] || HOST.prod;
// urlpath for json file
const urlList = ['./core/api/rest/config/config.json', './core/api/rest/setting/availableStores.json', './core/api/rest/setting/currency.json'];
// check file existence
const checkExist = urlList.map((list) => (
    fs.existsSync(list)
));

// function to read file json
function readTheFile(req, res) {
    fs.readFile('./core/api/rest/config/config.json', 'utf8', (err, jsonString) => {
        if (err) {
            // eslint-disable-next-line no-console
            console.log('File read failed:', err);
            res.status(500).json(err);
            return;
        }
        let response = JSON.parse(jsonString);
        if (req.query.field) {
            const field = req.query.field.split(',');
            const tempResponse = {};
            field.forEach((element) => {
                if (response.storeConfig && response.storeConfig[element]) {
                    tempResponse[element] = response.storeConfig[element];
                }
            });
            response = tempResponse;
        }
        res.status(200).json(response);
    });
}
// function to call generate-config
async function fetchConfig(req, res) {
    await fetch(`${url}/generate-config`, {
        headers: {
            Authorization: `Bearer ${getEncryptEnv()}`,
            'Content-Type': 'application/json',
        },
    })
    // eslint-disable-next-line no-console, no-unused-vars
        .then((resp) => {
            console.log('generate config success');
            return readTheFile(req, res);
        })
        .catch((err) => {
        // eslint-disable-next-line no-console
            console.log(err);
        });
}
module.exports = (req, res) => {
    if (`Bearer ${getAccessEnv()}` == req.headers.authorization) {
        if (checkExist.includes(false)) {
            fetchConfig(req, res);
        } else {
            readTheFile(req, res);
        }
    } else {
        res.status(403).json({ message: 'Token Invalid' });
    }
};
