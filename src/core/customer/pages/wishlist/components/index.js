/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
// Library
import Typography from '@common_typography';
import Button from '@common_button';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import useStyles from './style';
import Item from './item';

// Main Render Page
const Content = (props) => {
    const styles = useStyles();
    const {
        t, wishlist, refetch, handleRemove, handleToCart, handleAddAlltoBag, loading,
    } = props;
    return (
        <div className={styles.root}>
            {wishlist.length === 0 && (
                <Alert className="m-15" severity="warning">
                    {t('wishlist:notFound')}
                </Alert>
            )}
            <div className={styles.content}>
                {wishlist.map((item, index) => (
                    <Item key={index} {...item} {...props} refetch={refetch} handleRemove={handleRemove} handleToCart={handleToCart} />
                ))}
            </div>
            <div className={styles.footer}>
                <Button onClick={handleAddAlltoBag} disabled={loading || wishlist.length === 0} fullWidth>
                    <Typography variant="title" type="regular" letter="capitalize" color="white">
                        {t('wishlist:addAllToBag')}
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

export default Content;
