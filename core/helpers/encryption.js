const crypto = require('crypto');
const { graphqlEndpoint } = require('../../swift.config');
const { getAppEnv } = require('./env');

const query = `{
    storeConfig {
        swift_server {
            session_secret
        }
    }
}`;

const encrypt = (text) => {
    const encryption = fetch(`${graphqlEndpoint[getAppEnv()]}?query=${encodeURI(query)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((responseJson) => ({
            algorithm: responseJson.data.storeConfig.swift_server.algorithm,
            key: responseJson.data.storeConfig.swift_server.encryption_key,
        }))
        .catch((err) => {
            console.log(err);
        });
    const iv = encryption.encryption_key.substr(0, 16);
    const cipher = crypto.createCipheriv(encryption.algorithm, encryption.encryption_key, iv);
    let crypted = cipher.update(text, 'utf8', 'base64');
    crypted += cipher.final('base64');
    return crypted;
};

const decrypt = (text) => {
    const encryption = fetch(`${graphqlEndpoint[getAppEnv()]}?query=${encodeURI(query)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((responseJson) => ({
            algorithm: responseJson.data.storeConfig.swift_server.algorithm,
            key: responseJson.data.storeConfig.swift_server.encryption_key,
        }))
        .catch((err) => {
            console.log(err);
        });
    const iv = encryption.encryption_key.substr(0, 16);
    const decipher = crypto.createDecipheriv(encryption.algorithm, encryption.encryption_key, iv);
    let dec = decipher.update(text, 'base64', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

module.exports = {
    encrypt,
    decrypt,
};
