/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import { ContentDetail } from '../../../../../product/pages/default/core';
import { getProductBySku, addWishlist as mutationAddWishlist } from '../../../../../product/services/graphql';

const ItemView = (props) => {
    const {
        t, checkout, setCheckout, formik, Content, isLogin,
    } = props;
    const styles = useStyles();
    const dataArray = [];
    let product = {};

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    if (checkout && checkout.data) {
        if (checkout.data.cart) {
            if (checkout.data.cart.available_free_items.length > 0) {
                for (const [key, value] of Object.entries(checkout.data.cart.available_free_items)) {
                    // console.log(value.sku, key);
                    dataArray.push(value.sku);
                }
            }
        }
    }
    if (dataArray) {
        const { data } = getProductBySku({ variables: { sku: dataArray } });
        if (data && data.products) {
            if (data.products.items.length > 0) {
                product = data.products;
            }
        }
    }

    return (
        <div>
            {(checkout.data && checkout.data.cart && checkout.data.cart.available_free_items) && (
                <>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        Open dialog
                    </Button>
                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <MuiDialogTitle disableTypography className={styles.root} id="customized-dialog-title">
                            <Typography variant="h6">Modal popup</Typography>
                            {handleClose ? (
                                <IconButton aria-label="close" className={styles.closeButton} onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            ) : null}
                        </MuiDialogTitle>
                        <div className={styles.padding}>
                            {/* <ContentDetail
                                product={product}
                                t={t}
                                Content={Content}
                                isLogin={isLogin}
                            /> */}
                        </div>
                    </Dialog>
                </>
            )}
        </div>
    );
};

export default ItemView;
