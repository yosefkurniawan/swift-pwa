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
const fcm = {
    topic: 'notificationspwa',
    FCM_KEY_SERVER: 'AAAAqkymADY:APA91bHBOetzmkBWOhij2_UUv6gz9anWO7k_7xzQUBZqY5x0TNlFDZ5TUZQvkGuaQ2z4_2J1VXEayHh4ueTi855CuSuHViXE5AmRcIItKL38yK8ArxlHBA2fC6ONPRcpq9ki3lJvtoMj',
};

/* Cookie */
const SESSION_SECRET = 'asdasdd1212ads12!!!@**DADxx1';

module.exports = {
    encryption,
    SESSION_SECRET,
    fcm,
};
