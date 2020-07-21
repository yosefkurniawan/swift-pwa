/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import React from 'react';
import Typography from '@Typography';
import classNames from 'classnames';
import formatDate from '@helpers/date';
import { formatPrice } from '@helpers/currency';
import Alert from '@material-ui/lab/Alert';
import useStyles from '../style';
import ItemProduct from './ItemProduct';
import Footer from './Footer';

const DetailOrder = (props) => {
    const { t, detail, currency } = props;
    const styles = useStyles();
    let items = [];
    if (detail.length > 0 && detail[0].detail[0].items.length) {
        const itemsChild = detail[0].detail[0].items.filter((item) => {
            if (item.parent_item_id !== null) return item;
        });
        const simpleData = detail[0].detail[0].items.filter((item) => !itemsChild.find(({ sku }) => item.sku === sku) && item);
        items = [...itemsChild, ...simpleData];
    }
    if (detail.length > 0) {
        return (
            <div className="column">
                <div className={classNames(styles.block, styles.detail)}>
                    <Typography variant="title" letter="uppercase" type="bold">
                        {t('order:order')}
                        {' '}
                        {detail[0].status_label || ''}
                    </Typography>
                    <Typography variant="span">{formatDate(detail[0].created_at)}</Typography>
                    <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                        {
                            detail[0].detail[0].pickup_store && detail[0].detail[0].pickup_store.is_using_pickup_store
                                ? t('order:pickupAt') : t('order:shippedTo')
                        }
                    </Typography>
                    <Typography variant="span" align="center">
                        {detail[0].detail[0].shipping_address.firstname || ''}
                        <br />
                        {detail[0].detail[0].shipping_address.street || ''}
                        <br />
                        {detail[0].detail[0].shipping_address.city || ''}
                        <br />
                        {detail[0].detail[0].shipping_address.region || ''}
                        <br />
                        {detail[0].detail[0].shipping_address.country_id || ''}
                        <br />
                        {detail[0].detail[0].shipping_address.telephone || ''}
                        <br />
                        {detail[0].detail[0].shipping_address.postcode || ''}
                    </Typography>
                    {
                        detail[0].detail[0].pickup_store && detail[0].detail[0].pickup_store.is_using_pickup_store
                        && (
                            <>
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:pickupBy')}
                                </Typography>
                                <Typography variant="span">
                                    {detail[0].detail[0].pickup_store.pickup_person.name}
                                </Typography>
                                <Typography variant="span">
                                    {`Hp : ${detail[0].detail[0].pickup_store.pickup_person.handphone}`}
                                </Typography>
                                <Typography variant="span">
                                    {`Email : ${detail[0].detail[0].pickup_store.pickup_person.email}`}
                                </Typography>
                            </>
                        )
                    }
                    <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                        {t('order:shippingMethod')}
                    </Typography>
                    <Typography variant="span">{detail[0].detail[0].shipping_methods.shipping_description || ''}</Typography>
                    <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                        {t('order:paymentMethod')}
                    </Typography>
                    {Object.keys(detail[0].detail[0].payment.payment_additional_info).map((item) => {
                        if (item !== '__typename' && detail[0].detail[0].payment.payment_additional_info[item] !== ''
                            && detail[0].detail[0].payment.payment_additional_info[item] !== null) {
                            return (
                                <React.Fragment key={item}>
                                    <Typography variant="p" type="bold" letter="capitalize">
                                        {item.replace('_', ' ')}
                                    </Typography>
                                    <Typography variant="span">{detail[0].detail[0].payment.payment_additional_info[item] || ''}</Typography>
                                </React.Fragment>
                            );
                        }
                    })}
                </div>
                <div className={styles.block}>
                    {items.length > 0
                        && items.map((item, key) => <ItemProduct t={t} key={key} {...item} currency={currency} />)}
                </div>
                <div className={styles.block}>
                    {detail[0].detail[0].subtotal && (
                        <div className={styles.listSummary}>
                            <Typography variant="span" letter="capitalize">
                                Sub total
                            </Typography>
                            <Typography variant="span" letter="capitalize">
                                {formatPrice(detail[0].detail[0].subtotal, currency)}
                            </Typography>
                        </div>
                    )}
                    {detail[0].detail[0].payment && (
                        <div className={styles.listSummary}>
                            <Typography variant="span" letter="capitalize">
                                {t('order:shipping')}
                            </Typography>
                            <Typography variant="span" letter="capitalize">
                                {formatPrice(detail[0].detail[0].payment.shipping_amount, currency)}
                            </Typography>
                        </div>
                    )}
                    {detail[0].detail[0].discount_amount ? (
                        <div className={styles.listSummary}>
                            <Typography variant="span" letter="capitalize">
                                {t('order:discount')}
                            </Typography>
                            <Typography variant="span" letter="capitalize">
                                {formatPrice(detail[0].detail[0].discount_amount, currency)}
                            </Typography>
                        </div>
                    ) : null}
                    {detail[0].detail[0].aw_store_credit.is_use_store_credit ? (
                        <div className={styles.listSummary}>
                            <Typography variant="span" letter="capitalize">
                                {t('order:credit')}
                            </Typography>
                            <Typography variant="span" letter="capitalize">
                                {formatPrice(detail[0].detail[0].aw_store_credit.store_credit_amount, currency)}
                            </Typography>
                        </div>
                    ) : null}
                    {detail[0].detail[0].aw_giftcard.giftcard_amount ? (
                        <div className={styles.listSummary}>
                            <Typography variant="span" letter="capitalize">
                                {t('order:giftcard')}
                                {' '}
                                (
                                { detail[0].detail[0].aw_giftcard.giftcard_detail[0].giftcard_code }
                                )
                            </Typography>
                            <Typography variant="span" letter="capitalize">
                                {formatPrice(-detail[0].detail[0].aw_giftcard.giftcard_amount, currency)}
                            </Typography>
                        </div>
                    ) : null}
                    <div className={styles.listSummary}>
                        <Typography variant="title" type="bold" letter="capitalize">
                            Total
                        </Typography>
                        <Typography variant="title" type="bold" letter="capitalize">
                            {detail[0].detail[0].grand_total && formatPrice(detail[0].detail[0].grand_total, currency)}
                        </Typography>
                    </div>
                </div>
                <div className={styles.block}>
                    <Footer {...props} />
                </div>
            </div>
        );
    }
    return (
        <Alert className="m-15" severity="warning">
            {t('order:notFound')}
        </Alert>
    );
};

export default DetailOrder;
