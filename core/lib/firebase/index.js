import { graphqlEndpoint } from '@config';
import { decrypt } from '@helpers/clientEncryption';
import { getAccessEnv, getAppEnv } from '@helpers/env';
import firebase from 'firebase/app';

require('firebase/auth');
require('firebase/messaging');

const initializeFirebase = async () => {
    if (!firebase.apps.length) {
        const request = await fetch('/firebase-init', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getAccessEnv()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                endpoint: graphqlEndpoint[getAppEnv()],
            }),
        });
        const response = await request.json();
        const firebaseApp = firebase.initializeApp({
            apiKey: decrypt(response.apiKey),
            authDomain: decrypt(response.authDomain),
            databaseURL: decrypt(response.databaseURL),
            projectId: decrypt(response.projectId),
            storageBucket: decrypt(response.storageBucket),
            messagingSenderId: decrypt(response.messagingSenderId),
            appId: decrypt(response.appId),
            measurementId: decrypt(response.measurementId),
        });
        // .then((res) => res.json()).then((responseJson) => firebase.initializeApp({
        //     apiKey: decrypt(responseJson.apiKey),
        //     authDomain: decrypt(responseJson.authDomain),
        //     databaseURL: decrypt(responseJson.databaseURL),
        //     projectId: decrypt(responseJson.projectId),
        //     storageBucket: decrypt(responseJson.storageBucket),
        //     messagingSenderId: decrypt(responseJson.messagingSenderId),
        //     appId: decrypt(responseJson.appId),
        //     measurementId: decrypt(responseJson.measurementId),
        // }))
        //     .catch((err) => console.log(err));
        return firebaseApp;
    }
    return firebase.app();
};

export default initializeFirebase;
