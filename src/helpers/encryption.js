import crypto from 'crypto';
import { keyEncrypt, algorithm } from '@config';

export const encrypt = (text) => {
    const cipher = crypto.createCipher(algorithm, keyEncrypt);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

export const decrypt = (text) => {
    const decipher = crypto.createDecipher(algorithm, keyEncrypt);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

export default {
    encrypt,
    decrypt,
};
