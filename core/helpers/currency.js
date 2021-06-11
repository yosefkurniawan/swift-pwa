import { removeDecimalPrice } from '@config';

/* eslint-disable no-param-reassign */
const { general } = require('@config');
const cookies = require('js-cookie');

/**
 * [METHOD] get currency [CURRENT] value
 * [NOTES] Currency Base on IDR 1
 * [NOTES] {USD}/{IDR} = 1/14820 = 0.0007
 * @param {object} APP_CURRENCY
 * @param {double} value
 */
const getCurrentCurrency = ({ APP_CURRENCY, value }) => {
    const APP_CURRENCY_OBJECT = JSON.parse(APP_CURRENCY);
    const rateBaseCurrency = APP_CURRENCY_OBJECT.base_currency_rate;
    const rateDefaultCurrency = APP_CURRENCY_OBJECT.default_currency_rate;
    const codeDefaultCurrency = APP_CURRENCY_OBJECT.default_display_currency_code;

    const currency = codeDefaultCurrency;
    if (rateBaseCurrency > rateDefaultCurrency) {
        value *= rateDefaultCurrency;
    } else if (rateBaseCurrency < rateDefaultCurrency) {
        value /= rateDefaultCurrency;
    }

    return { currency, value };
};

/**
 * [METHOD] format for price
 * @param {double} value
 * @param {string} currency
 */
export const formatPrice = (value, currency = general.defaultCurrencyCode) => {
    const default_locales = 'en-US';

    /* --- CHANGE TO CURRENT CURRENCY --- */
    /**
     * window === undefined to handle localstorage from reload
     */
    const APP_CURRENCY = typeof window === 'undefined' ? undefined : cookies.get('app_currency');
    if (APP_CURRENCY !== undefined) {
        const getCurrent = getCurrentCurrency({ APP_CURRENCY, value });
        currency = getCurrent.currency;
        value = getCurrent.value;
    }
    /* --- CHANGE TO CURRENT CURRENCY --- */

    const price = new Intl.NumberFormat(default_locales, {
        style: 'currency',
        currency,
    }).format(value);
    const decimalFeature = () => {
        const dec = price.split('.')[1];
        const resultInt = parseInt(dec, 10);
        const result = price.split('.')[0];
        if (removeDecimalPrice.enabled === true && resultInt === 0) {
            return result;
        }
        return price;
    };

    return decimalFeature();
};

export default { formatPrice };
