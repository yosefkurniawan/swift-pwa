const crypto = require('crypto');
const { graphqlEndpoint } = require('../../swift.config');
const { getAppEnv, getAccessEnv } = require('./env');

const query = `{
    storeConfig {
        swift_server {
            algorithm
            encryption_key
        }
    }
}`;

const encrypt = (text) => {
    fetch(`${graphqlEndpoint[getAppEnv()]}?query=${encodeURI(query)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessEnv()}`,
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            const iv = responseJson.data.storeConfig.swift_server.encryption_key.substr(0, 16);
            const cipher = crypto.createCipheriv(
                responseJson.data.storeConfig.swift_server.algorithm,
                responseJson.data.storeConfig.swift_server.encryption_key,
                iv,
            );
            let crypted = cipher.update(text, 'utf8', 'base64');
            crypted += cipher.final('base64');
            return crypted;
        })
        .catch((err) => {
            console.log(err);
        });
};

const decrypt = (text) => {
    fetch(`${graphqlEndpoint[getAppEnv()]}?query=${encodeURI(query)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessEnv()}`,
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            const iv = responseJson.data.storeConfig.swift_server.encryption_key.substr(0, 16);
            const decipher = crypto.createDecipheriv(
                responseJson.data.storeConfig.swift_server.algorithm,
                responseJson.data.storeConfig.swift_server.encryption_key,
                iv,
            );
            let dec = decipher.update(text, 'base64', 'utf8');
            dec += decipher.final('utf8');
            return dec;
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    encrypt,
    decrypt,
};
