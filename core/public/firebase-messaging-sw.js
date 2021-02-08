/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* global importScripts, firebase */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
const { features } = require('../../swift.config');

importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
const firebaseConfig = features.pushNotification.config;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class CustomPushEvent extends Event {
    constructor(data) {
        super('push');
        Object.assign(this, data);
        this.custom = true;
    }
}

/*
 * https://github.com/firebase/quickstart-js/issues/71 GAMBIARRA!
 * Overrides push notification data, to avoid having 'notification' key and firebase blocking
 * the message handler from being called
 */
self.addEventListener('push', (e) => {
    // Skip if event is our own custom event
    if (e.custom) return;

    // Keep old event data to override
    const oldData = e.data;

    // remove notification key to prevent default notifications (background)
    const newEvent = new CustomPushEvent({
        data: {
            json() {
                const newData = oldData.json();
                delete newData.notification;
                return newData;
            },
        },
        waitUntil: e.waitUntil.bind(e),
    });

    // Stop event propagation
    e.stopImmediatePropagation();

    // Dispatch the new wrapped event
    dispatchEvent(newEvent);
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload,
    );
    // Customize notification here
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.icons || '',
        image: payload.data.image || '',
        requireInteraction: true,
        data: payload,
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});

/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const { data } = event.notification;

    let { path } = data.data;

    if (path.charAt(0) === '/') {
        path = path.substring(1);
    }

    const urlToOpen = new URL(`${self.location.origin}/${path}`, self.location.origin).href;

    const promiseChain = clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
    })
        .then((windowClients) => {
            let matchingClient = null;

            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                if (windowClient.url === urlToOpen) {
                    matchingClient = windowClient;
                    break;
                }
            }

            if (matchingClient) {
                return matchingClient.focus();
            }
            return clients.openWindow(urlToOpen);
        });

    event.waitUntil(promiseChain);
});
