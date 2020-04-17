const IDR = (value) => {
    let number = 0;
    if (Number.isInteger(value)) {
        // eslint-disable-next-line radix
        number = parseInt(value);
    }
    number = number.toLocaleString(undefined, { minimumFractionDigits: 0 });
    return `IDR ${number}`;
};

// eslint-disable-next-line no-shadow
function currency({ currency = 'IDR', value = 0 }) {
    switch (currency.toUpperCase()) {
    case 'IDR':
        return IDR(value);
    default:
        return IDR(value);
    }
}

export default currency;
