import Button from '@components/Button';
import Typography from '@components/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import Router from 'next/router';
import React from 'react';
import useStyles from './style';

const renderQty = () => {
    const options = [];
    // eslint-disable-next-line no-plusplus
    for (let item = 1; item <= 10; item++) {
        options.push(
            <MenuItem key={item} value={item}>
                {item}
            </MenuItem>,
        );
    }
    return options;
};

export default ({
    qty = 1,
    handleQty = () => {},
    handleAddToCart = () => {},
    t,
    loading = false,
}) => {
    const styles = useStyles();
    const dataQty = renderQty(qty);
    return (
        <>
            <div className={styles.qty}>
                <Typography variant="span">{t('common:title:qty')}</Typography>
                <Select
                    defaultValue={1}
                    value={qty}
                    onChange={handleQty}
                    variant="outlined"
                    disabled={loading}
                >
                    {dataQty}
                </Select>
            </div>
            <div className={styles.footer}>
                <Button
                    className={styles.btnAddToCard}
                    color="primary"
                    onClick={handleAddToCart}
                    loading={loading}
                >
                    <Typography
                        align="center"
                        type="regular"
                        letter="capitalize"
                        className={styles.textBtnAddToCard}
                    >
                        {t('product:addToCart')}
                    </Typography>
                </Button>
            </div>
        </>
    );
};
