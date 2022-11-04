const crypto = require('crypto');

const key = 'TXAjwm8k53PJG9NacLbyZavvQB2qBh43'; // TXAjwm8k53PJG9NacLbyZavvQB2qBh43 || asdasdd1212ads12!!!@**DADxx1
const algorithm = 'aes-256-cbc';

const iv = key.substr(0, 16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let crypted = cipher.update(text, 'utf8', 'base64');
    crypted += cipher.final('base64');
    return crypted;
};

const decrypt = (text) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let dec = decipher.update(text, 'base64', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

module.exports = {
    encrypt,
    decrypt,
};
