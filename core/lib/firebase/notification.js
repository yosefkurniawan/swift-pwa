/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import { features } from '@config';
import firebase from './index';

const notification = {
    // send token to api
    sendTokenToServer(token) {
        fetch('/auth/fcm-token', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({
                token,
            }),
        });
    },
    getTokenFcm() {
        const messaging = firebase.messaging();
        messaging
            .getToken()
            .then((currentToken) => {
                if (currentToken) {
                    notification.sendTokenToServer(currentToken);
                } else {
                }
            })
            .catch((err) => {});
    },
    updateTokenFcm() {
        const messaging = firebase.messaging();
        // Callback fired if Instance ID token is updated.
        messaging.onTokenRefresh(() => {
            messaging
                .getToken()
                .then((refreshedToken) => {
                    notification.sendTokenToServer(refreshedToken);
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log('Unable to retrieve refreshed token ', err);
                });
        });
    },
    init() {
        try {
            const messaging = firebase.messaging();
            messaging.usePublicVapidKey(features.firebase.pushNotification.config.pairKey);

            // request notification
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    notification.getTokenFcm();
                    notification.updateTokenFcm();
                } else {
                    // handle ketika di block
                }
            });
        } catch (err) {}
    },
};

export default notification;
