import React, { useState } from 'react';
import { getGroupedProduct } from '../../../services/graphql';

const GroupedProductOption = ({
    View, data, ...other
}) => {
    const {
        sku,
    } = data;
    const [loading] = useState(false);
    const [itemsCart, setItemsCart] = useState({});
    const { loading: loadData, data: products } = getGroupedProduct(sku);

    let optionsData = [];

    if (!loadData && products && products.products && products.products.items
        && products.products.items.length > 0
        && products.products.items[0].items && products.products.items[0].items.length > 0) {
        optionsData = products.products.items[0].items;
    }

    const handleAddToCart = () => {
        console.log(itemsCart);
    };

    return (
        <View
            {...other}
            handleAddToCart={handleAddToCart}
            loading={loading}
            loadData={loadData}
            optionsData={optionsData}
            disabled={loading || loadData}
            itemsCart={itemsCart}
            setItemsCart={setItemsCart}
        />
    );
};

export default GroupedProductOption;
