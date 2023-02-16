/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const { getAccessEnv, getEncryptEnv } = require('../../../helpers/env');
const generateConfig = require('./generateconfig');

// urlpath for json file
const urlList = ['./generated/config.json', './generated/availableStores.json', './generated/currency.json'];
// check file existence
const checkExist = urlList.map((list) => (
    fs.existsSync(list)
));

// function to read file json
function readTheFile(req, res) {
    fs.readFile('./generated/config.json', 'utf8', (err, jsonString) => {
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

module.exports = async (req, res) => {
    if (`Bearer ${getAccessEnv()}` == req.headers.authorization) {
        if (checkExist.includes(false)) {
            const reqHeader = {
                headers: {
                    authorization: `Bearer ${getEncryptEnv()}`,
                },
            };
            // function to call generate-config
            await generateConfig(reqHeader, res);
        } else {
            readTheFile(req, res);
        }
    } else {
        res.status(403).json({ message: 'Token Invalid' });
    }
};
