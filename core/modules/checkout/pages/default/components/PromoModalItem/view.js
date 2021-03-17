/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@common_typography';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import RedeemIcon from '@material-ui/icons/Redeem';
import ProductItem from '@core_modules/catalog/plugin/ProductItem';
import useStyles from './style';

const Caraousel = dynamic(() => import('@common_slick/Caraousel'), { ssr: false });

const PromoModalItemView = (props) => {
    const {
        items, handleAddToCart, handleClickOpen, handleClose, open,
    } = props;
    const styles = useStyles();

    return (
        <div>
            <div className={styles.freeItemContainer}>
                <RedeemIcon />
            &nbsp;
                <span>
                    Select your
                    <Button variant="text" color="primary" onClick={handleClickOpen}>
                        <Typography type="bold" letter="uppercase">
                            Free Gift!
                        </Typography>
                    </Button>
                </span>

                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="md">
                    <MuiDialogTitle disableTypography className={styles.root} id="customized-dialog-title">
                        <Typography variant="h6">Free Promo Items</Typography>
                        {handleClose ? (
                            <IconButton aria-label="close" className={styles.closeButton} onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        ) : null}
                    </MuiDialogTitle>
                    <div className={classNames(styles.carouselContainer, 'col-xs-12 col-lg-12')}>
                        <Caraousel
                            data={items}
                            Item={ProductItem}
                            enableAddToCart
                            handleAddToCart={handleAddToCart}
                            enableWishlist={false}
                            enablePrice={false}
                            enableRating={false}
                        />
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default PromoModalItemView;
