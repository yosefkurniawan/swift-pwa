import { graphqlEndpoint } from '@config';
import { getAppEnv, getHeaderEnv } from '@helpers/env';
import firebase from 'firebase/app';

require('firebase/auth');
require('firebase/messaging');

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

const firebaseConfig = fetch(`${graphqlEndpoint[getAppEnv()]}?query=${encodeURI(query)}`, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${getHeaderEnv()}`,
        'Content-Type': 'application/json',
    },
})
    .then((response) => response.json())
    .then((responseJson) => ({
        apiKey: responseJson.data.storeConfig.firebase_api_key.api_key,
        authDomain: responseJson.data.storeConfig.firebase_api_key.auth_domain,
        databaseURL: responseJson.data.storeConfig.firebase_api_key.database_url,
        projectId: responseJson.data.storeConfig.firebase_api_key.project_id,
        storageBucket: responseJson.data.storeConfig.firebase_api_key.storage_bucket,
        messagingSenderId: responseJson.data.storeConfig.firebase_api_key.messaging_sender_id,
        appId: responseJson.data.storeConfig.firebase_api_key.app_id,
        measurementId: responseJson.data.storeConfig.firebase_api_key.measurement_id,
    }))
    .catch((err) => {
        console.log(err);
    });

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
