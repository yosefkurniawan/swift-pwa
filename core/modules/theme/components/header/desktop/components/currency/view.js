import React from 'react';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles } from '@material-ui/core/styles';

/**
 * useStyle
 */
const useStyles = makeStyles(() => ({
    listItemText: {
        fontSize: '.7em', // Insert your required size
        textTransform: 'uppercase',
    },
}));

const ViewCurrency = (props) => {
    const {
        t, title, id, open, anchorEl, currencyState, handleClick, handleClose, setDefaultCurrency, loading,
    } = props;
    const classes = useStyles();
    const anchorOrigin = { vertical: 'bottom', horizontal: 'left' };
    const transforOrigin = { vertical: 'top', horizontal: 'left' };
    const styleTitle = { fontSize: 12, textTransform: 'uppercase' };
    const styleButtonCurrency = { fontFamily: 'Montserrat', padding: '0px', fontSize: title ? '12px' : '1em' };

    /**
     * loading state
     */
    if (loading) {
        return (
            <div>
                {title && <Skeleton style={{ padding: 0 }} variant="rect" width={100} height={10} />}
                <Skeleton style={{ display: 'inline-block', padding: 0 }} variant="rect" width={100} height={10} />
            </div>
        );
    }

    /**
     * not loading && check data
     */
    if (!loading && currencyState !== null) {
        if (currencyState.exchange_rates.length === 1) return null;
    }

    /**
     * rendering
     */
    return (
        <div>
            {/* [CURRENCY] TITLE */}
            {title && (
                <div>
                    <strong style={styleTitle}>{title}</strong>
                </div>
            )}

            {/* [CURRENCY] BUTTON */}
            <Button onClick={handleClick} style={styleButtonCurrency}>
                {t('common:menu:currency')}
                :&nbsp;
                <strong>{currencyState === null ? '' : currencyState.default_display_currency_code}</strong>
            </Button>

            {/* [CURRENCY] LIST */}
            <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={anchorOrigin} transformOrigin={transforOrigin}>
                <List component="nav">
                    {currencyState !== null
                        && currencyState.exchange_rates.map((item, index) => {
                            const { currency_to } = item;
                            const currency_default = currencyState === null ? '' : currencyState.default_display_currency_code;
                            const isCurrent = currency_to === currency_default;
                            const default_display_currency_code = currency_to;
                            const default_currency_rate = item.rate;
                            return isCurrent ? null : (
                                <ListItem
                                    button
                                    key={`currency-${index}`}
                                    onClick={() => setDefaultCurrency({ default_display_currency_code, default_currency_rate })}
                                >
                                    <ListItemText
                                        classes={{ primary: classes.listItemText }}
                                        primary={`${t('common:menu:changeto')} ${currency_to}`}
                                    />
                                </ListItem>
                            );
                        })}
                </List>
            </Popover>
        </div>
    );
};

export default ViewCurrency;
