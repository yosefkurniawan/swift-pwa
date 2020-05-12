/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import Link from 'next/link';
import { IconButton, Zoom } from '@material-ui/core';
import {
    CreateOutlined,
    FavoriteBorderOutlined,
    DeleteOutlineOutlined,
} from '@material-ui/icons';
import { formatPrice } from '@helpers/currency';

import useStyles from '../style';
import ConfirmationDelete from './confirmDelete';


const Item = ({
    t, editMode, id, toggleEditDrawer, product, quantity, configurable_options = [], deleteItem, prices,
    handleFeed,
}) => {
    const styles = useStyles();
    const [confirmDel, setConfirmDel] = useState(false);

    const handleDelete = () => {
        setConfirmDel(false);
        deleteItem(id);
    };

    const handleAddWishlist = () => {
        handleFeed(product.id, id);
    };
    return (
        <div className={styles.item}>
            <ConfirmationDelete
                t={t}
                open={confirmDel}
                handleDelete={handleDelete}
                handleCancel={() => setConfirmDel(false)}
            />
            <div className={styles.itemImgWrapper}>
                <img
                    src={product.small_image.url}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                    className={styles.itemImg}
                    alt={product.name}
                />
            </div>
            <div className={styles.itemInfo}>
                <Link
                    href="/[...slug]"
                    as={`/${product.url_key}`}
                >
                    <a className={styles.itemName}>{product.name}</a>
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
                    {formatPrice(prices.price.value, prices.price.currency)}
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
                    <IconButton className={styles.iconBtn} onClick={handleAddWishlist}>
                        <FavoriteBorderOutlined className={styles.icon} />
                    </IconButton>
                </Zoom>
                <Zoom
                    in={editMode}
                    onClick={() => setConfirmDel(true)}
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
