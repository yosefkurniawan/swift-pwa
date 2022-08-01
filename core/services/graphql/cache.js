import { makeVar } from '@apollo/client';
import { general } from '@config';

export const currencyVar = makeVar({
    locale: general.defaultCurrencyLocale,
    currency: general.defaultCurrencyLocale,
    enableRemoveDecimal: true,
    appCurrency: undefined,
});

export default {
    currencyVar,
};
