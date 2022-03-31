import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import React from 'react';
import { useTranslation } from '@i18n';
import Image from '@common_image';
import useStyles from '@core_modules/rma/pages/detail/components/styles';

const ItemProduct = (props) => {
    const {
        name, qty_rma, price_incl_tax, image_url,
        currency = 'IDR', custom_fields, storeConfig = {},
    } = props;
    const { t } = useTranslation(['return']);
    const styles = useStyles();

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    return (
        <div className="column">
            <div className={styles.itemContainer}>
                <div className={styles.productImgContainer}>
                    <Image
                        src={image_url}
                        className={styles.productImg}
                        alt={name}
                        width={defaultWidth}
                        height={defaultHeight}
                        quality={80}
                    />
                </div>
                <div className={styles.detailItem}>
                    <Typography variant="span">{name}</Typography>
                    <Typography variant="span">{formatPrice(price_incl_tax, currency)}</Typography>
                    <Typography variant="span" className={styles.textDetail}>
                        {t('common:title:qty')}
                        {' '}
                        :
                        {' '}
                        {qty_rma || 0}
                    </Typography>
                    {
                        custom_fields.map((field, indx) => (
                            <Typography key={indx} variant="span" className={styles.textDetail}>
                                {field.field.frontend_labels[0].value}
                                {' '}
                                :
                                {' '}
                                {field.value.frontend_labels[0].value}
                            </Typography>
                        ))
                    }
                    <div className="flex-grow" />
                </div>
            </div>
        </div>
    );
};

export default ItemProduct;
