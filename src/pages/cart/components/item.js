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

import { imageSize } from '@config';
import useStyles from '../style';
import ConfirmationDelete from './confirmDelete';
import Image from '../../../components/Image';


const Item = (props) => {
    const {
        t, editMode, toggleEditDrawer, product, quantity, configurable_options = [], deleteItem, prices,
        handleFeed,
    } = props;
    const styles = useStyles();
    const [confirmDel, setConfirmDel] = useState(false);

    const handleDelete = () => {
        setConfirmDel(false);
        deleteItem(props);
    };

    const handleAddWishlist = () => {
        handleFeed(props);
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
                <Image
                    src={product.small_image.url}
                    className={styles.itemImg}
                    alt={product.name}
                    width={imageSize.product.width}
                    height={imageSize.product.height}
                    quality={80}
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
                    {configurable_options ? <div>{t('common:variant')}</div> : null}
                    { configurable_options ? configurable_options.map((item, idx) => (
                        <div key={idx}>
                            {item.option_label}
                            {' '}
                            :
                            {' '}
                            {item.value_label}
                        </div>
                    )) : null}

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
