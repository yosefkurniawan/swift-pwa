import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Image from '@common_image';
import useStyles from '@core_modules/rma/pages/new/components/styles';

const ItemProductView = (props) => {
    const {
        checked, disabled, handleChange, name,
        image_url, price_incl_tax, currency, storeConfig = {},
    } = props;
    const styles = useStyles();

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    return (
        <div className={styles.itemContainer}>
            <Checkbox checked={checked} disabled={disabled} onChange={handleChange} inputProps={{ 'aria-label': name }} />
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
                <Typography variant="span" type="semiBold">
                    {name || ''}
                </Typography>
                <Typography variant="span">{formatPrice(price_incl_tax, currency)}</Typography>
                <div className="flex-grow" />
            </div>
        </div>
    );
};

export default ItemProductView;
