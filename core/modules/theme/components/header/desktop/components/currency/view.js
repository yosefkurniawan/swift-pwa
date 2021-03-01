import React from 'react';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    listItemText: {
        fontSize: '.7em', // Insert your required size
        textTransform: 'uppercase',
    },
}));

const ViewCurrency = (props) => {
    const classes = useStyles();
    const {
        t, id, open, loading, anchorEl, currencyState, handleClick, handleClose, setDefaultCurrency,
    } = props;
    const anchorOrigin = { vertical: 'bottom', horizontal: 'center' };
    const transforOrigin = { vertical: 'top', horizontal: 'center' };

    if (loading) {
        return (
            <div>
                {t('theme:loading')}
                ...
            </div>
        );
    }
    return (
        <div>
            <Button onClick={handleClick} style={{ padding: '0px', fontSize: '1em' }}>
                {t('theme:currency')}
                :&nbsp;
                <strong>{currencyState === null ? '' : currencyState.default_display_currency_code}</strong>
            </Button>

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
                                        primary={`${t('theme:menu:changeto')} ${currency_to}`}
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
