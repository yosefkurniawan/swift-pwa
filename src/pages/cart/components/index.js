/* eslint-disable no-plusplus */
import { useState } from 'react';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import Button from '@components/Button';
import Link from 'next/link';
import { getCartId } from '@helpers/cartId';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useMutation } from '@apollo/react-hooks';
import Item from './item';
import CrossSell from './crosssell';
import useStyles from '../style';
import EditDrawer from './editDrawer';
import CheckoutDrawer from './checkoutBox';
import { getCartData } from '../services';
import SkeletonCart from './skeleton';
import * as Schema from '../services/schema';

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
    const [editItem, setEditItem] = useState({});
    const [openEditDrawer, setOpenEditDrawer] = useState(false);
    const [backdrop, setBackdrop] = React.useState(false);
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

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const toggleEditDrawer = (item) => {
        setEditItem(item);
        setOpenEditDrawer(!openEditDrawer);
    };

    // delete item from cart
    const [actDeleteItem, resultDelete] = useMutation(Schema.deleteCartitem);
    const [actUpdateItem, resultUpdate] = useMutation(Schema.updateCartitem);
    if (resultDelete.data && backdrop) {
        setBackdrop(false);
    }

    // delete items
    const deleteItem = (itemId) => {
        setBackdrop(true);
        actDeleteItem({
            variables: {
                cartId,
                cart_item_id: itemId,
            },
            refetchQueries: [
                {
                    query: Schema.getCart,
                    variables: { cartId },
                    fetchPolicy: 'cache-and-network',
                },
            ],
        });
        setEditMode(false);
    };

    // update items
    const updateItem = (itemData) => {
        setBackdrop(true);
        actUpdateItem({
            variables: {
                cartId,
                cart_item_id: itemData.cart_item_id,
                quantity: itemData.quantity,
            },
            refetchQueries: [
                {
                    query: Schema.getCart,
                    variables: { cartId },
                    fetchPolicy: 'cache-and-network',
                },
            ],
        });
    };
    if (resultUpdate.data && backdrop) {
        toggleEditMode();
        setBackdrop(false);
    }

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

    crosssell = getCrossSellProduct(dataCart.items);
    if (dataCart.id && dataCart.items.length > 0) {
        return (
            <>
                <Backdrop className={styles.backdrop} open={backdrop}>
                    <CircularProgress color="inherit" />
                </Backdrop>
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
                                toggleEditDrawer={() => toggleEditDrawer({
                                    id: item.id,
                                    quantity: item.quantity,
                                    product_name: item.product.name,
                                })}
                                deleteItem={deleteItem}
                                {...props}
                                {...item}
                            />
                        ))}
                    </div>
                </Box>
                <CrossSell {...props} editMode={editMode} data={crosssell} />
                {editItem.id ? (
                    <EditDrawer
                        open={openEditDrawer}
                        toggleOpen={toggleEditDrawer}
                        updateItem={updateItem}
                        {...props}
                        {...editItem}
                    />
                ) : null}

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
