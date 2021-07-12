const Cookies = require('js-cookie');
const { storeCode, selectStoreCookie } = require('../../swift.config');

const getStoreCodeServer = (context) => {
    let code = '';
    if (typeof window === 'undefined' && context && context.cookies
        && context.cookies.select_store) {
        code = context.cookies.select_store;
    }

    if (typeof window !== 'undefined') {
        code = Cookies.get(selectStoreCookie);
    }

    if (storeCode) {
        code = storeCode;
    }

    return code;
};

const getStoreCodeClient = () => {
    let code = '';
    if (typeof window !== 'undefined') {
        code = Cookies.get(selectStoreCookie);
        if (storeCode) {
            code = storeCode;
        }
    }

    return code;
};

module.exports = {
    getStoreCodeServer,
    getStoreCodeClient,
};
