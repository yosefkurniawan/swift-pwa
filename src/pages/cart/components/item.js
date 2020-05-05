/* eslint-disable no-underscore-dangle */
import Link from 'next/link';
import { IconButton, Zoom } from '@material-ui/core';
import {
    CreateOutlined,
    FavoriteBorderOutlined,
    DeleteOutlineOutlined,
} from '@material-ui/icons';
import PriceFormat from '@components/PriceFormat';
import useStyles from '../style';

const Item = ({
    t, editMode, toggleEditDrawer, product, quantity, configurable_options = [],
}) => {
    const styles = useStyles();
    return (
        <div className={styles.item}>
            <div className={styles.itemImgWrapper}>
                <img
                    src={product.thumbnail.url}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                    className={styles.itemImg}
                    alt={product.name}
                />
            </div>
            <div className={styles.itemInfo}>
                <Link
                    href="/product/[id]"
                    as="/product/product-123"
                >
                    <a className={styles.itemName}>Product Name</a>
                </Link>
                <div className={styles.itemVariant}>
                    <div>{t('common:variant')}</div>
                    {configurable_options.map((item, idx) => (
                        <div key={idx}>
                            {item.option_label}
                            {' '}
                            :
                            {' '}
                            {item.value_label}
                        </div>
                    ))}

                    <div>
                        Qty :
                        {' '}
                        {quantity}
                    </div>
                </div>
                <div className={styles.itemPrice}>
                    <PriceFormat
                        priceRange={product.price_range}
                        priceTiers={product.price_tiers}
                        // eslint-disable-next-line camelcase
                        productType={product.__typename}
                    />
                </div>
            </div>

            <div className={styles.itemActions}>
                <Zoom
                    in={editMode}
                    style={{ transitionDelay: editMode ? '0ms' : '100ms' }}
                >
                    <IconButton
                        className={styles.iconBtn}
                        onClick={toggleEditDrawer}
                    >
                        <CreateOutlined className={styles.icon} />
                    </IconButton>
                </Zoom>
                <Zoom
                    in={editMode}
                    style={{ transitionDelay: editMode ? '50ms' : '50ms' }}
                >
                    <IconButton className={styles.iconBtn}>
                        <FavoriteBorderOutlined className={styles.icon} />
                    </IconButton>
                </Zoom>
                <Zoom
                    in={editMode}
                    style={{ transitionDelay: editMode ? '100ms' : '0ms' }}
                >
                    <IconButton className={styles.iconBtn}>
                        <DeleteOutlineOutlined className={styles.icon} />
                    </IconButton>
                </Zoom>
            </div>
        </div>
    );
};

export default Item;
