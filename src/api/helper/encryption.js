const crypto = require('crypto');

const keyEncrypt = '1238kasdjlkqweo`kljasdklj""""""sd';

const encrypt = (text) => {
    const cipher = crypto.createCipher('aes-256-cbc', keyEncrypt);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

const decrypt = (text) => {
    const decipher = crypto.createDecipher('aes-256-cbc', keyEncrypt);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

module.exports = {
    encrypt,
    decrypt,
};
