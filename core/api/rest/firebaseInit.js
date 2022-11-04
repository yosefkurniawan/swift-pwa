const { getAccessEnv } = require('../../helpers/env');
const { encrypt } = require('../../helpers/clientEncryption');

module.exports = async (req, res) => {
    const { endpoint } = req.body;

    const query = `{
        storeConfig {
            firebase_api_key {
                api_key
                auth_domain
                database_url
                project_id
                storage_bucket
                messaging_sender_id
                app_id
                measurement_id
            }
        }
    }`;

    await fetch(`${endpoint}?query=${encodeURI(query)}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getAccessEnv()}`,
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            res.status(200).json({
                apiKey: encrypt(responseJson.data.storeConfig.firebase_api_key.api_key),
                authDomain: encrypt(responseJson.data.storeConfig.firebase_api_key.auth_domain),
                databaseURL: encrypt(responseJson.data.storeConfig.firebase_api_key.database_url),
                projectId: encrypt(responseJson.data.storeConfig.firebase_api_key.project_id),
                storageBucket: encrypt(responseJson.data.storeConfig.firebase_api_key.storage_bucket),
                messagingSenderId: encrypt(responseJson.data.storeConfig.firebase_api_key.messaging_sender_id),
                appId: encrypt(responseJson.data.storeConfig.firebase_api_key.app_id),
                measurementId: encrypt(responseJson.data.storeConfig.firebase_api_key.measurement_id),
            });
        })
        .catch((e) => {
            res.status(500).json(e);
        });
};
