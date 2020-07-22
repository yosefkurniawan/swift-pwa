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

/* Cookie */
const SESSION_SECRET = 'asdasdd1212ads12!!!@**DADxx1';

module.exports = {
    encryption,
    SESSION_SECRET,
};
