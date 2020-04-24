/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@components/Button';
import Typography from '@components/Typography';
import {
    Dialog, Fade, MenuItem, Select,
} from '@material-ui/core';
// import Router from 'next/router';
import React from 'react';
import { setCountCart } from '@stores/actions/cart';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { nameCartId } from '@config';
import { GraphCart } from '@services/graphql';
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
    const [addCartSimple] = addSimpleProductsToCart();
    let cartId = Cookies.get(nameCartId);
    const [getCartId] = GraphCart.getGuestCartId();
    const handleAddToCart = () => {
        if (!cartId) {
            getCartId()
                .then((res) => {
                    const token = res.data.createEmptyCart;
                    Cookies.set(nameCartId, token, { expires: 24 });
                    cartId = token;
                })
                .catch((e) => console.log(e));
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
                setOpen(false);
            });
        }
    };

    return (
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
    );
};

export default OptionDialog;
