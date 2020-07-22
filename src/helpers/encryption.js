const crypto = require('crypto');
const {
    encryption: { key, algorithm },
} = require('../../swift-server.config');

const encrypt = (text) => {
    const cipher = crypto.createCipher(algorithm, key);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

const decrypt = (text) => {
    try {
        const decipher = crypto.createDecipher(algorithm, key);
        let dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    } catch (error) {
        return text;
    }
};

module.exports = {
    encrypt,
    decrypt,
};
