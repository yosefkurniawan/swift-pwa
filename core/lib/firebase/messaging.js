/* eslint-disable import/prefer-default-export */
import { features } from '@config';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = features.firebase.config;

let messaging;
export const getMessaging = async () => {
    if (!messaging) {
        const { default: firebase } = await import('firebase/app');
        await import('firebase/messaging');

        const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
        messaging = app.messaging();
    }

    return messaging;
};
