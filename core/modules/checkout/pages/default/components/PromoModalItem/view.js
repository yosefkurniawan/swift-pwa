/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import ProductItem from '@core_modules/catalog/plugin/ProductItem';
import useStyles from './style';
import { getProductBySku, addWishlist as mutationAddWishlist } from '../../../../../product/services/graphql';

const Caraousel = dynamic(() => import('@common_slick/Caraousel'), { ssr: false });

const ItemView = (props) => {
    const {
        t, checkout, setCheckout, formik, Content, isLogin,
    } = props;
    const styles = useStyles();
    const dataArray = [];

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    let contentCaraousel = '';
    console.log(checkout);
    if (checkout && checkout.data) {
        if (checkout.data.cart) {
            if (checkout.data.cart.available_free_items) {
                if (checkout.data.cart.available_free_items.length > 0) {
                    for (const [key, value] of Object.entries(checkout.data.cart.available_free_items)) {
                        // console.log(value.sku, key);
                        dataArray.push(value.sku);
                    }
                }
            }
        }
    }
    if (dataArray) {
        const { data } = getProductBySku({ variables: { sku: dataArray } });
        if (data && data.products) {
            if (data.products.items.length > 0) {
                contentCaraousel = <Caraousel data={data.products.items} Item={ProductItem} />;
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
                            <Typography variant="h6">Promo Items</Typography>
                            {handleClose ? (
                                <IconButton aria-label="close" className={styles.closeButton} onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            ) : null}
                        </MuiDialogTitle>
                        <div className={styles.padding}>
                            <div className={classNames(styles.carouselContainer, 'col-xs-12 col-lg-12')}>
                                {contentCaraousel}
                            </div>
                        </div>
                    </Dialog>
                </>
            )}
        </div>
    );
};

export default ItemView;
