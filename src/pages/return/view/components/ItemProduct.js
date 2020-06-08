import Typography from '@components/Typography';
import { formatPrice } from '@helpers/currency';
import React from 'react';
import useStyles from '../style';

const ItemProduct = (props) => {
    const {
        name, qty_ordered, t,
    } = props;
    const styles = useStyles();
    return (
        <div className="column">
            <div className={styles.itemContainer}>
                <div className={styles.productImgContainer}>
                    <img
                        src="/assets/img/placeholder.png"
                        className={styles.productImg}
                        alt={name}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                    />
                </div>
                <div className={styles.detailItem}>
                    <Typography variant="span">Products Name</Typography>
                    <Typography variant="span">{formatPrice(9000, 'USD')}</Typography>
                    <Typography variant="span" className={styles.textDetail}>
                        {t('common:title:qty')}
                        {' '}
                        :
                        {qty_ordered || 0}
                    </Typography>
                    <Typography variant="span" className={styles.textDetail}>
                        {t('return:form:label:reason')}
                        {' '}
                        :
                        {qty_ordered || 0}
                    </Typography>
                    <div className="flex-grow" />
                </div>
            </div>
        </div>
    );
};

export default ItemProduct;
