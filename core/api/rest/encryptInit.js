const { getAccessEnv } = require('../../helpers/env');
const { encrypt } = require('../../helpers/clientEncryption');

module.exports = (req, res) => {
    const { endpoint } = req.body;

    const query = `{
        storeConfig {
            swift_server {
                algorithm
                encryption_key
            }
        }
    }`;

    fetch(`${endpoint}?query=${encodeURI(query)}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getAccessEnv()}`,
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            res.status(200).json({
                algorithm: encrypt(responseJson.data.storeConfig.swift_server.algorithm),
                encryption_key: encrypt(responseJson.data.storeConfig.swift_server.encryption_key),
            });
        })
        .catch((e) => {
            res.status(500).json(e);
        });
};
