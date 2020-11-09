const { encrypt, decrypt } = require('../../../helpers/encryption');

const decryptState = (state) => {
    const raw = decrypt(state);
    const res = raw.split('|');
    const token = res[0];
    const cartId = res[1];
    const redirect_path = res[2] ? res[2] : '/';

    const result = {
        token,
        cartId,
        redirect_path,
    };
    return result;
};

const internalGenerateSession = async (parent, { state }, context) => {
    const { token, cartId, redirect_path } = decryptState(state);
    if (typeof state !== 'undefined' && state) {
        if (token) {
            context.session.token = encrypt(token);
        }
        return {
            result: true,
            cartId,
            isLogin: !!token,
            redirect_path,

        };
    }
    return {
        result: false,
        cartId: null,
        isLogin: null,
        redirect_path: '/',
    };
};

module.exports = internalGenerateSession;
