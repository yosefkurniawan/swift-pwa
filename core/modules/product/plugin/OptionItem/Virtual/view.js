import Typography from '@common_typography';
import ButtonQty from '@common_buttonqty';
import React from 'react';
import Button from '@common_button';
import useStyles from './style';

const SimpleOptionView = ({
    qty = 1,
    setQty = () => { },
    handleAddToCart = () => { },
    t,
    loading = false,
    disabled = false,
    showQty = true,
}) => {
    const styles = useStyles();
    return (
        <>
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

export default SimpleOptionView;
