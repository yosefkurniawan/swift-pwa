/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
const requestInternal = require('../../rest/request');

const internalGetCurrency = async () => {
    let result;
    const dataCurrency = await requestInternal('getSetting?field=currency');
    if (dataCurrency) {
        result = dataCurrency.currency;
    }
    return result;
};

module.exports = internalGetCurrency;
