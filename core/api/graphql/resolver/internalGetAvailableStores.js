/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
const requestInternal = require('../../rest/request');

const internalGetAvailableStores = async () => {
    let result;
    const dataStores = await requestInternal('getSetting?field=availableStores');
    if (dataStores) {
        result = dataStores.availableStores;
    }
    return result;
};

module.exports = internalGetAvailableStores;
