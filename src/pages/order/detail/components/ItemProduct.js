import Typography from '@Typography';
import { formatPrice } from '@helpers/currency';
import React from 'react';
import useStyles from '../style';

const ItemProduct = ({
    name, price, qty_ordered, currency, t, image_url,
}) => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <div className={styles.productImgContainer}>
                <img
                    src={image_url || '/assets/img/placeholder.png'}
                    className={styles.productImg}
                    alt={name}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                />
            </div>
            <div className={styles.detailItem}>
                <Typography variant="label">{name || ''}</Typography>
                <Typography variant="span">{formatPrice(price, currency)}</Typography>
                <Typography variant="span" className={styles.textDetail}>
                    {t('common:title:qty')}
                    {' '}
                    :
                    {qty_ordered || 0}
                </Typography>
                <div className="flex-grow" />
            </div>
        </div>
    );
};

export default ItemProduct;
