const { general } = require('@config');

export const formatPrice = (value, currency = general.defaultCurrencyCode) => {
    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(value);

    return price;
};

export default { formatPrice };
