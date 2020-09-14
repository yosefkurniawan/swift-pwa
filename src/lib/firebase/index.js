import firebase from 'firebase/app';

require('firebase/auth');
require('firebase/messaging');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBwAPEXdjKf84q-T7tUxVJBcOJJ8hzrXTI',
    authDomain: 'swift-pwa.firebaseapp.com',
    databaseURL: 'https://swift-pwa.firebaseio.com',
    projectId: 'swift-pwa',
    storageBucket: 'swift-pwa.appspot.com',
    messagingSenderId: '1029426161575',
    appId: '1:1029426161575:web:2c57e3f74cb00e0132f882',
    measurementId: 'G-VSRV1DJVSQ',
};
export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
