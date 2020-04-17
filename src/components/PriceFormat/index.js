import Typography from '@components/Typography';
// eslint-disable-next-line import/no-unresolved
const currencyFormatter = require('currency-formatter');

const dummyCode = 'IDR';

export default ({
    value = 0,
    code = dummyCode,
    defaultSet = false,
    ...other
}) => {
    let format = {
        code,
        decimal: ',',
        thousand: '.',
        precision: 0,
        format: '%s %v',
    };
    format = code === 'IDR' && defaultSet === false
        ? { ...format, symbol: 'IDR' }
        : { ...format };
    return (
        <Typography variant="span" type="bold" letter="uppercase" {...other}>
            {currencyFormatter.format(value, format)}
        </Typography>
    );
};
