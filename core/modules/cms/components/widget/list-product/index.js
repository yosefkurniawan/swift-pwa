/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React from 'react';
import Carousel from '@common_slick/Caraousel';
import ProductItem from '@core_modules/catalog/plugin/ProductItem';
import GridList from '@common_gridlist';

import { modules } from '@config';
import { getCategoryProducts } from '@core_modules/catalog/services/graphql';

/**
 * [COMBINE] data condition for better format
 * @param {json} condition_object
 * @returns
 */
const getDataCondition = ({ condition_object }) => {
    let conditions = {};
    for (const condition_index in condition_object) {
        const condition_item = condition_object[condition_index];
        const attribute = condition_item?.attribute;
        const aggregator = condition_item?.aggregator;
        if (attribute !== undefined) conditions = { ...conditions, attribute, attribute_value: condition_item?.value };
        if (aggregator !== undefined) conditions = { ...conditions, aggregator, aggregator_value: condition_item?.value };
    }
    return conditions;
};

const WidgetListProduct = (props) => {
    const { template, products_count, conditions_encoded } = props;
    const condition_object = JSON.parse(conditions_encoded);
    const page = 1;

    const dataCondition = getDataCondition({ condition_object });
    let dataItems = [];

    /**
     * [QUERY] query for products items
     */
    if (dataCondition.attribute === 'category_ids') {
        const { data } = getCategoryProducts({ category_id: dataCondition.attribute_value, products_count, page });
        dataItems = data?.categoryList[0]?.products?.items;
    }

    /**
     * [TEMPLATE] type slider || grid
     */
    if (template === 'slider' && dataItems?.length > 0) return <Carousel data={dataItems} Item={ProductItem} />;
    if (template === 'grid' && dataItems?.length > 0) {
        return (
            <GridList
                data={dataItems}
                ItemComponent={ProductItem}
                className="grid"
                gridItemProps={{ xs: 6, sm: 4, md: modules.catalog.productListing.drawerFilterOnDesktop.enabled ? 3 : 2 }}
            />
        );
    }

    return (
        <div>
            our widget still not supported for
            {' '}
            <strong>{dataCondition.attribute}</strong>
        </div>
    );
};

export default WidgetListProduct;
