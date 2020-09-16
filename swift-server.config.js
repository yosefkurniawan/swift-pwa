/* eslint-disable max-len */
/* --------------------------------------- */
/* Server Side Configuration
/* --------------------------------------- */
// put all sensitive configuration that is used in server side only here
// this way to avoid sensitive values such as ecnryption key to be included in js bundling and can be exposed in client side.

/* Encryption */
const encryption = {
    key: 'TXAjwm8k53PJG9NacLbyZavvQB2qBh43',
    algorithm: 'aes-256-cbc',
};

/* key server fcm */
const FCM_KEY_SERVER = 'AAAA766Up6c:APA91bH2dV9Nz5ox_jlhoh8BocmCnbfMjs0zjnamaPd1WsQgGn_VyQdVLnfBH5F01oJ592MZ4p-txdObjRl8C_dTr0zvhJWIBBT73X_4G2q7w0Jj-EOHSebgn10jvjuqskd2ZGZpbc1n';

/* Cookie */
const SESSION_SECRET = 'asdasdd1212ads12!!!@**DADxx1';

module.exports = {
    encryption,
    SESSION_SECRET,
    FCM_KEY_SERVER,
};
