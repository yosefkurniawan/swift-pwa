import { features, storeConfigNameCookie, defaultLocale } from '@config';
import helperCookies from '@helper_cookies';

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
    const isServer = typeof window === 'undefined';
    const storeConfig = helperCookies.get(storeConfigNameCookie);
    const locale = !isServer && storeConfig ? storeConfig.locale.replace('_', '-') : defaultLocale;

    /* --- CHANGE TO CURRENT CURRENCY --- */
    /**
     * window === undefined to handle localstorage from reload
     */
    const APP_CURRENCY = isServer ? undefined : cookies.get('app_currency');
    if (APP_CURRENCY !== undefined) {
        const getCurrent = getCurrentCurrency({ APP_CURRENCY, value });
        currency = getCurrent.currency;
        value = getCurrent.value;
    }
    /* --- CHANGE TO CURRENT CURRENCY --- */

    const price = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(value);

    const decimalFeature = () => {
        const decimal = price.substr(price.length - 3).substring(1);
        const resultDecimal = parseInt(decimal, 10);
        const resultPrice = price.slice(0, -3);
        if (resultDecimal === 0) {
            return resultPrice;
        }
        return price;
    };

    return features.removeDecimalPrice.enabled === true ? decimalFeature() : price;
};

export default { formatPrice };
