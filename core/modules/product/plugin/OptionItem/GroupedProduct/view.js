import React from 'react';
import Typography from '@common_typography';
import classNames from 'classnames';
import Footer from '../components/Footer';
import useStyles from './style';
import Item from './Item';

const GroupedProductOptionView = ({
    t, loading, disabled,
    handleAddToCart = () => {},
    loadData = false,
    optionsData = [],
    itemsCart,
    setItemsCart,
    ...other
}) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            { (!loadData && optionsData.length > 0) ? (
                <div className={styles.itemsBox}>
                    <div className={classNames(styles.item, styles.header)}>
                        <Typography type="bold">{t('common:product:titleProduct')}</Typography>
                        <Typography type="bold">{t('common:title:shortQty')}</Typography>
                    </div>
                    {
                        optionsData.map((item, key) => (
                            <Item
                                key={key}
                                {...item}
                                itemsCart={itemsCart}
                                setItemsCart={setItemsCart}
                                disabled={disabled}
                            />
                        ))
                    }
                </div>
            ) : null }
            <Footer
                loading={loading}
                disabled={disabled}
                showQty={false}
                handleAddToCart={handleAddToCart}
                t={t}
                showAddToCart
                {...other}
            />
        </div>
    );
};

export default GroupedProductOptionView;
