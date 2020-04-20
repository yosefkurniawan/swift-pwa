import React from 'react';
import Typography from '@components/Typography';
import { withRedux } from '@lib/redux';
import { compose } from 'redux';
import { useSelector } from 'react-redux';

const currencyFormatter = require('currency-formatter');

const dummyCode = 'IDR';

const PriceFormat = ({
    value = 0, code = dummyCode, ...other
}) => {
    const storeConfig = useSelector((state) => state.config.storeConfig);
    const format = {
        code: (storeConfig.base_currency_code) ? storeConfig.base_currency_code : code,
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

export default compose(withRedux)(PriceFormat);
