/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@components/Button';
import Typography from '@components/Typography';
import Toast from '@components/Toast';
import {
    Dialog, Fade, MenuItem, Select,
} from '@material-ui/core';
// import Router from 'next/router';
import React from 'react';
import { setCountCart } from '@stores/actions/cart';
import { useDispatch } from 'react-redux';
import { GraphCart } from '@services/graphql';
import { getToken } from '@helpers/token';
import { getCartId, setCartId } from '@helpers/cartId';
import { addSimpleProductsToCart } from '../../services/graphql';
import ListConfigurableOption from './ListConfigurableOption';
import useStyles from './style';

const Transition = React.forwardRef((props, ref) => (
    <Fade ref={ref} {...props} />
));

const renderQty = () => {
    const options = [];
    // eslint-disable-next-line no-plusplus
    for (let item = 1; item <= 10; item++) {
        options.push(
            <MenuItem key={item} value={item}>
                {item}
            </MenuItem>,
        );
    }
    return options;
};

const OptionDialog = (props) => {
    const {
        open,
        setOpen,
        t,
        data: { __typename, sku },
    } = props;
    const styles = useStyles();
    const [qty, setQty] = React.useState(1);
    const dataQty = renderQty(qty);
    const handleQty = (event) => {
        setQty(event.target.value);
    };
    const dispatch = useDispatch();
    let cartId = '';
    let tokenCustomer = '';

    if (typeof window !== 'undefined') {
        tokenCustomer = getToken();
        cartId = getCartId();
    }

    const [message, setMessage] = React.useState({
        variant: 'success',
        open: false,
        text: t('product:successAddCart'),
    });

    const [addCartSimple] = addSimpleProductsToCart(tokenCustomer);
    const [getGuestCartId] = GraphCart.getGuestCartId();

    const handleAddToCart = async () => {
        const errorMessage = {
            variant: 'error',
            text: t('prodcut:failedAddCart'),
            open: true,
        };
        if (!cartId || cartId === '' || cartId === undefined) {
            if (tokenCustomer === '' || !tokenCustomer) {
                await getGuestCartId()
                    .then((res) => {
                        const token = res.data.createEmptyCart;
                        cartId = token;
                        setCartId(token);
                    })
                    .catch(() => {
                        setMessage(errorMessage);
                    });
            }
        }
        if (__typename === 'SimpleProduct') {
            addCartSimple({
                variables: {
                    cartId,
                    sku,
                    qty: parseFloat(qty),
                },
            }).then((res) => {
                dispatch(
                    setCountCart(
                        res.data.addSimpleProductsToCart.cart.total_quantity,
                    ),
                );
                setMessage({ variant: 'success', text: t('prodcut:successAddCart'), open: true });
                setOpen(false);
            }).catch(() => {
                setMessage(errorMessage);
            });
        }
    };

    return (
        <>
            <Toast
                open={message.open}
                setOpen={() => setMessage({ ...message, open: false })}
                message={message.text}
                variant={message.variant}
            />
            <Dialog
                fullScreen
                open={open}
                TransitionComponent={Transition}
                onClose={setOpen}
                PaperProps={{
                    className: styles.dialog,
                }}
            >
                <div className={styles.root}>
                    <div
                        className={styles.bannerContainer}
                        onClick={() => setOpen()}
                    />
                    <div className={styles.optionContainer}>
                        <Button
                            variant="text"
                            onClick={setOpen}
                            className={styles.btnClose}
                        >
                            <Typography variant="p">Close</Typography>
                        </Button>

                        {__typename === 'ConfigurableProduct' && (
                            <ListConfigurableOption {...props} />
                        )}

                        <div className={styles.qty}>
                            <Typography variant="span">Qty</Typography>
                            <Select
                                defaultValue={1}
                                value={qty}
                                onChange={handleQty}
                                variant="outlined"
                            >
                                {dataQty}
                            </Select>
                        </div>
                        <div className={styles.footer}>
                            <Button
                                className={styles.btnAddToCard}
                                color="primary"
                                onClick={handleAddToCart}
                            >
                                <Typography
                                    align="center"
                                    type="regular"
                                    letter="capitalize"
                                    className={styles.textBtnAddToCard}
                                >
                                    {t('product:addToCart')}
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default OptionDialog;
