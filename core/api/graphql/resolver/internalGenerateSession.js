const { decrypt, encrypt } = require('../../../helpers/encryption');
const requestGraph = require('../request');

const query = `
{
    customer {
      email
    }
  }
`;

const decryptState = (state) => {
    const raw = decrypt(state);
    const res = raw.split('|');
    const token = res[0];
    const cartId = res[1];
    const storeCode = res[2] ? res[2] : '';
    const redirect_path = res[3] ? res[3] : '/';

    const result = {
        token,
        cartId,
        redirect_path,
        storeCode,
    };
    return result;
};

const internalGenerateSession = async (parent, { state }, context) => {
    const {
        token, cartId, redirect_path, storeCode,
    } = decryptState(state);
    if (token && token !== '') {
        const res = await requestGraph(query, { }, context, { token });
        if (res.response && res.response.errors) {
            return {
                result: false,
                cartId,
                isLogin: false,
                redirect_path,
                storeCode,
            };
        }
        context.session.token = encrypt(token);
        return {
            result: true,
            cartId,
            isLogin: !!token,
            redirect_path,
            storeCode,
        };
    }
    if (typeof state !== 'undefined' && state) {
        if (token && token !== '') {
            context.session.token = encrypt(token);
        }
        return {
            result: true,
            cartId,
            isLogin: !!token,
            redirect_path,
            storeCode,
        };
    }
    return {
        result: false,
        cartId: null,
        isLogin: null,
        redirect_path: '/',
        storeCode,
    };
};

module.exports = internalGenerateSession;
