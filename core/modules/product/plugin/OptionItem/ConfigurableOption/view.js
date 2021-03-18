import Typography from '@common_typography';
import ButtonQty from '@common_buttonqty';
import React from 'react';
import Button from '@common_button';
import Item from './Item';
import useStyles from './style';

const ConfigurableView = (props) => {
    const {
        loading, disabled, showQty = true, handleAddToCart, qty, setQty,
        t, options, selectConfigurable, ...other
    } = props;
    const styles = useStyles();
    return (
        <>
            {options.map((item, index) => (
                <Item
                    key={index}
                    option={item.options}
                    selected={selectConfigurable}
                    value={item.value}
                    {...other}
                />
            ))}
            { showQty && (
                <div className={styles.qty}>
                    <Typography type="bold" variant="span">{t('common:title:qty')}</Typography>
                    <ButtonQty
                        value={qty}
                        onChange={setQty}
                        max={10000}
                        disabled={disabled}
                    />
                </div>
            ) }
            <div className={styles.SimpleOptionView}>
                <Button
                    className={styles.btnAddToCard}
                    color="primary"
                    onClick={handleAddToCart}
                    loading={loading}
                    disabled={disabled}
                >
                    <Typography
                        align="center"
                        type="bold"
                        letter="uppercase"
                        color="white"
                        variant="span"
                    >
                        {t('product:addToCart')}
                    </Typography>
                </Button>
            </div>
        </>
    );
};

export default ConfigurableView;
