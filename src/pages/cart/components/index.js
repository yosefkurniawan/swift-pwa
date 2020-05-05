/* eslint-disable no-plusplus */
import { useState } from 'react';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import Button from '@components/Button';
import Link from 'next/link';
import { getCartId } from '@helpers/cartId';
import Item from './item';
import CrossSell from './crosssell';
import useStyles from '../style';
import EditDrawer from './editDrawer';
import CheckoutDrawer from './checkoutBox';
import { getCartData } from '../services';
import SkeletonCart from './skeleton';

const getCrossSellProduct = (items) => {
    let crosssell = [];
    for (let index = 0; index < items.length; index++) {
        crosssell = crosssell.concat(items[index].product.crosssell_products);
    }
    return crosssell;
};

const Cart = (props) => {
    const { t } = props;
    const styles = useStyles();
    const [editMode, setEditMode] = useState(false);
    const [openEditDrawer, setOpenEditDrawer] = useState(false);
    let cartId = '';
    let dataCart = {
        id: null,
        total_quantity: 0,
        applied_coupons: null,
        prices: {},
        items: [],
    };
    let loadingCart = true;
    let crosssell = [];

    if (typeof window !== 'undefined') {
        cartId = getCartId();
        const { loading, data } = getCartData(cartId);
        loadingCart = loading;
        if (!loading) {
            dataCart = data.cart;
        }
    }
    if (loadingCart) {
        return <SkeletonCart />;
    }
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const toggleEditDrawer = () => {
        setOpenEditDrawer(!openEditDrawer);
    };

    crosssell = getCrossSellProduct(dataCart.items);
    if (dataCart.id && dataCart.items.length > 0) {
        return (
            <>
                <Box className={styles.container}>
                    <div className={styles.toolbar}>
                        <div className={styles.toolbarCounter}>
                            <Typography variant="p" type="regular">
                                <span>{dataCart.total_quantity}</span>
                                {' '}
                                {t('cart:counter:text')}
                            </Typography>
                        </div>
                        <div className={styles.toolbarActions}>
                            <Button
                                variant="outlined"
                                className={styles.toolbarButton}
                                onClick={toggleEditMode}
                            >
                                {editMode ? (
                                    <>{t('common:button:save')}</>
                                ) : (
                                    <>{t('common:button:edit')}</>
                                )}
                            </Button>
                        </div>
                    </div>
                    <div className={styles.items}>
                        {dataCart.items.map((item, idx) => (
                            <Item
                                key={idx}
                                editMode={editMode}
                                toggleEditDrawer={toggleEditDrawer}
                                {...props}
                                {...item}
                            />
                        ))}
                    </div>
                </Box>
                <CrossSell {...props} editMode={editMode} data={crosssell} />
                <EditDrawer
                    open={openEditDrawer}
                    toggleOpen={toggleEditDrawer}
                    {...props}
                />
                <CheckoutDrawer editMode={editMode} t={t} data={dataCart} />
            </>
        );
    }
    return (
        <Box className={styles.container} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="span" type="regular" align="center">
                <span className={styles.emptyCart}>{t('cart:empty:text')}</span>
            </Typography>
            <Link href="/">
                <a>
                    <Button className={styles.toolbarButton} customRootStyle={{ width: 'fit-content' }}>
                        {t('common:button:continueShopping')}
                    </Button>
                </a>
            </Link>
        </Box>
    );
};

export default Cart;
