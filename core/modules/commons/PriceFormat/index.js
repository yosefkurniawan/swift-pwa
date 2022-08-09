/* eslint-disable camelcase */
import React from 'react';
import BundleProductTypePrice from '@common_priceformat/components/BundleProductTypePrice';
import OtherProductTypePrice from '@common_priceformat/components/OtherProductTypePrice';
import SimpleProductTypePrice from '@common_priceformat/components/SimpleProductTypePrice';
import { useReactiveVar } from '@apollo/client';
import { currencyVar } from '@root/core/services/graphql/cache';

/**
 * Price Generator Component
 * @component
 * @param {array} priceRange - price range from magento GQL including regluar price and final price
 * @returns {object} [priceTiers] - tier prices from magento GQL
 */

const Price = ({
    priceRange = {},
    priceTiers = [],
    productType = 'SimpleProduct',
    ...other
}) => {
    const currencyCache = useReactiveVar(currencyVar);

    if (!priceRange) {
        return <>Invalid price</>;
    }

    if (productType === 'SimpleProduct') {
        return (
            <SimpleProductTypePrice
                priceRange={priceRange}
                priceTiers={priceTiers}
                currencyCache={currencyCache}
                {...other}
            />
        );
    }
    if (productType === 'BundleProduct') {
        return (
            <BundleProductTypePrice
                priceRange={priceRange}
                priceTiers={priceTiers}
                currencyCache={currencyCache}
                {...other}
            />
        );
    }

    return (
        <OtherProductTypePrice
            priceRange={priceRange}
            priceTiers={priceTiers}
            currencyCache={currencyCache}
            {...other}
        />
    );
};

export default Price;
