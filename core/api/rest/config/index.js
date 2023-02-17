/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const path = require('path');
const { dirname } = require('path');
const { getAccessEnv, getEncryptEnv } = require('../../../helpers/env');
const generateConfig = require('./generateconfig');

// urlpath for json file
const myRoot = dirname(require.main.filename);
const baseDir = path.join(myRoot, 'generated/');
const urlList = [`${baseDir}config.json`, `${baseDir}availableStores.json`, `${baseDir}currency.json`];

// check file existence
let check;
async function checkExist() {
    check = urlList.map((list) => (
        fs.existsSync(list)
    ));
    return check;
}

// function to read file json
function readTheFile(req, res) {
    fs.readFile(`${baseDir}config.json`, 'utf8', (err, jsonString) => {
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
        await checkExist();
        if (check.includes(false)) {
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
