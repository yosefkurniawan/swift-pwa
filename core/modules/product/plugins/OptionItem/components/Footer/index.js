import React from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import Typography from '@common_typography';
import ButtonQty from '@common_buttonqty';

import useStyles from '@plugin_optionitem/components/Footer/style';

const Button = dynamic(() => import('@common_button'), { ssr: true });

const ConfigurableView = (props) => {
    const {
        loading,
        disabled,
        showQty = true,
        handleAddToCart,
        qty,
        setQty,
        t,
        showAddToCart = true,
        customStyleBtnAddToCard = '',
        labelAddToCart = '',
        maxQty = 10000,
        customButton,
        customQty = false,
        freeItemsData,
    } = props;
    const styles = useStyles();

    if (customButton) {
        return customButton;
    }

    return (
        <>
            {showQty && (
                <div className={classNames(styles.qty, 'product-OptionItem-qty')}>
                    <Typography type="bold" variant="span">
                        {t('common:title:qty')}
                    </Typography>
                    <ButtonQty value={qty} onChange={setQty} max={customQty ? freeItemsData.quantity : maxQty} disabled={disabled} />
                </div>
            )}
            {showAddToCart && (
                <div className={styles.btnAddToCardContainer}>
                    <Button
                        id="plugin-addToCart-btn"
                        className={classNames(styles.btnAddToCard, customStyleBtnAddToCard)}
                        color="primary"
                        onClick={handleAddToCart}
                        loading={loading}
                        disabled={disabled}
                    >
                        <Typography align="center" type="bold" letter="uppercase" color="white" variant="inherit">
                            {labelAddToCart || t('product:addToCart')}
                        </Typography>
                    </Button>
                </div>
            )}
        </>
    );
};

export default ConfigurableView;
