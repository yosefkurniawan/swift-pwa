/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-lonely-if */
/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import LocalStorage from '@helper_localstorage';
import ViewCurrency from './view';

import { getCurrency } from '../../../../../services/graphql';

const ComponentCurrencyExchange = (props) => {
    const { t } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [actGetCurrency, { data, loading }] = getCurrency();
    const [currencyState, setCurrencyState] = useState(null);

    const mount = useRef();

    /**
     * [useEffect] for react lifecycle
     */
    useEffect(() => {
        mount.current = true;
        return () => (mount.current = false);
    }, []);

    /**
     * [useEffect] for {data} currency changes
     */
    useEffect(() => {
        if (mount.current) {
            const getCurrencyFromStorage = async () => {
                try {
                    const currencyLocalStorage = await LocalStorage.getLocalStorage('APP_CURRENCY');
                    /** [GET] Currency */
                    if (currencyLocalStorage === null && data === undefined) actGetCurrency();
                    else {
                        /**
                         * [GET] Currency if store in local storage, no need request to server
                         * !not updated [clear local storage for updated]
                         */
                        if (currencyLocalStorage !== null) setCurrencyState(currencyLocalStorage);
                        /** [SET] Currency if not store in local storage */ else {
                            const { currency } = data;
                            const { base_currency_code } = currency;
                            const { default_display_currency_code } = currency;
                            const { exchange_rates } = currency;
                            const exchange_rates_base = exchange_rates.filter((item) => item.currency_to === base_currency_code);
                            const exchange_rates_default = exchange_rates.filter((item) => item.currency_to === default_display_currency_code);
                            const base_currency_rate = exchange_rates_base[0].rate;
                            const default_currency_rate = exchange_rates_default[0].rate;
                            const dataStore = {
                                base_currency_code,
                                base_currency_rate,
                                default_display_currency_code,
                                default_currency_rate,
                                exchange_rates,
                            };

                            LocalStorage.setLocalStorage('APP_CURRENCY', dataStore);
                            setCurrencyState(dataStore);
                        }
                    }
                } catch (err) {
                    console.log('[err] get currency error', err);
                }
            };
            getCurrencyFromStorage();
        }
    }, [data]);

    /**
     * [METHOD] handle click popover
     * @param {*} event
     */
    const handleClick = (event) => setAnchorEl(event.currentTarget);

    /**
     * [METHOD] handle close popover
     */
    const handleClose = () => setAnchorEl(null);

    /**
     * [METHOD] set default currency code
     * @param {string} code
     */
    const setDefaultCurrency = ({ default_display_currency_code, default_currency_rate }) => {
        const dataStore = {
            ...currencyState,
            default_display_currency_code,
            default_currency_rate,
        };

        LocalStorage.setLocalStorage('APP_CURRENCY', dataStore);
        setCurrencyState(dataStore);

        window.location.reload();
    };

    const propsOther = {
        t,
        id,
        open,
        data,
        loading,
        anchorEl,
        currencyState,
        handleClick,
        handleClose,
        setDefaultCurrency,
    };

    return <ViewCurrency {...propsOther} />;
};

export default ComponentCurrencyExchange;
