// Library
import { Button, Toolbar } from '@material-ui/core';
import { GraphCustomer } from '@services/graphql';
import React from 'react';
import useStyles from './style';
import Loaders from './Loader';
import Item from './Item';

// Main Render Page
const Content = (props) => {
    const styles = useStyles();
    const { token } = props;
    let wishlist = [];
    const { data, loading, error } = GraphCustomer.getCustomer(token);

    if (!data || loading) return <Loaders />;
    if (data) {
        wishlist = data.customer.wishlist.items.map(({ product }) => ({
            ...product,
            name: product.name,
            link: product.url_key,
            imageSrc: product.small_image.url,
            price: product.price_range.minimum_price.regular_price.value,
        }));
    }
    if (error) console.log(error);
    return (
        <div className={styles.root}>
            {wishlist.map((item, index) => (
                <Item key={index} {...item} />
            ))}
            <Toolbar>
                <Button variant="contained" className={[styles.productAddAllToCart].join(' ')}>
                    <span>Add All to Bag</span>
                </Button>
            </Toolbar>
        </div>
    );
};

export default Content;
