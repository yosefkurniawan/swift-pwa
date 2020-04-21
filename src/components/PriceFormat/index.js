import React from 'react';
import Typography from '@components/Typography';
import { defaultCurrencyCode } from '@config';

const currencyFormatter = require('currency-formatter');

const PriceFormat = ({
    value = 0, code = defaultCurrencyCode, storeConfig, ...other
}) => {
    const format = {
        code: (storeConfig && storeConfig.base_currency_code) ? storeConfig.base_currency_code : code,
        decimal: ',',
        thousand: '.',
        precision: 0,
        format: '%s %v',
    };

    return (
        <Typography variant="span" type="bold" letter="uppercase" {...other}>
            {currencyFormatter.format(value, format)}
        </Typography>
    );
};

export default PriceFormat;
