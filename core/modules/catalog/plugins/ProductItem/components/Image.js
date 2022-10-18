/* eslint-disable jsx-a11y/anchor-is-valid */
import Thumbor from '@common_image';
import Link from '@material-ui/core/Link';
import React from 'react';
import useStyles from '@plugin_productitem/style';

const ImageDetail = (props) => {
    const {
        handleClick, small_image, spesificProduct, name, storeConfig = {},
    } = props;
    const styles = useStyles();

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);
    if (!storeConfig || !storeConfig.pwa) {
        return (
            <Link onClick={handleClick} style={{ width: '100%' }}>
                <img
                    data-pagespeed-no-defer
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                    }}
                    src="/assets/img/placeholder.png"
                    alt="placeholkder"
                />
            </Link>
        );
    }

    return (
        <Link onClick={handleClick} style={{ width: '100%' }}>
            <Thumbor
                // eslint-disable-next-line no-nested-ternary
                src={spesificProduct.id ? spesificProduct.image.url
                    : small_image && small_image.url
                        ? small_image.url
                        : '/assets/img/placeholder.png'}
                className={styles.imgProduct}
                width={defaultWidth}
                height={defaultHeight}
                quality={80}
                alt={small_image && small_image.url ? small_image.label : name}
                storeConfig={storeConfig}
                lazy
            />
        </Link>
    );
};

export default ImageDetail;
