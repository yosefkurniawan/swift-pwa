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
import { getCartData } from "../services"

const Cart = (props) => {
    const { t } = props;
    const styles = useStyles();
    const [editMode, setEditMode] = useState(false);
    const [openEditDrawer, setOpenEditDrawer] = useState(false);
    let cartId = '';
    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }

    const { loading, data } = getCartData(cartId);

    if (loading) {
        return <div>loading</div>;
    }
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const toggleEditDrawer = () => {
        setOpenEditDrawer(!openEditDrawer);
    };

    const { cart } = data;
    console.log(cart)
    if (cart && data.cart.id) {
        return (
            <>
                <Box className={styles.container}>
                    <div className={styles.toolbar}>
                        <div className={styles.toolbarCounter}>
                            <Typography variant="p" type="regular">
                                <span>{cart.total_quantity}</span>
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
                        <Item
                            editMode={editMode}
                            toggleEditDrawer={toggleEditDrawer}
                            {...props}
                        />
                        <Item
                            editMode={editMode}
                            toggleEditDrawer={toggleEditDrawer}
                            {...props}
                        />
                    </div>
                </Box>
                {/* <CrossSell {...props} editMode={editMode} /> */}
                <EditDrawer
                    open={openEditDrawer}
                    toggleOpen={toggleEditDrawer}
                    {...props}
                />
                {/* <CheckoutDrawer editMode={editMode} t={t} /> */}
            </>
        );
    }
    return (
        <Box className={styles.container}>
            <Typography variant="span" type="regular" align="center">
                <span className={styles.emptyCart}>{t('cart:empty:text')}</span>
            </Typography>
            <Link href="/">
                <Button className={styles.toolbarButton}>
                    {t('common:button:continueShopping')}
                </Button>
            </Link>
        </Box>
    );
};

export default Cart;
