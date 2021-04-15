/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
import React, { useEffect, useRef } from 'react';
import Carousel from '@common_slick/Caraousel';
import ProductItem from '@core_modules/catalog/plugin/ProductItem';
import GridList from '@common_gridlist';
import SkeletonWidget from '@common_slick/Caraousel/Skeleton';

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

const TEMPLATE_SLIDER = 'slider';
const TEMPLATE_GRID = 'grid';

const WidgetListProduct = (props) => {
    const { template, products_count, conditions_encoded } = props;
    const condition_object = JSON.parse(conditions_encoded);
    const mount = useRef();
    const page = 1;

    const dataCondition = getDataCondition({ condition_object });
    let dataLoading = true;
    let dataItems = [];

    /**
     * [QUERY] query for products items
     */
    if (dataCondition.attribute === 'category_ids') {
        const { data, loading } = getCategoryProducts({ category_id: dataCondition.attribute_value, products_count, page });
        dataLoading = loading;
        dataItems = data?.categoryList[0]?.products?.items;
    }

    /**
     * [useEffect]
     */
    useEffect(() => {
        mount.current = true;
        if (typeof window !== 'undefined' && mount.current) {
            if (document.getElementsByClassName('widget-product-list')) {
                const elms = document.getElementsByClassName('widget-product-list');
                for (let i = 0; i < elms.length; i++) {
                    elms[i].className = 'full-width widget-product-list';
                }
            }
            if (document.getElementsByClassName('widget-product-list-skeleton')) {
                const elms = document.getElementsByClassName('widget-product-list-skeleton');
                for (let i = 0; i < elms.length; i++) {
                    elms[i].className = 'full-width widget-product-list-skeleton hide';
                }
            }
        }

        return () => (mount.current = false);
    }, []);

    /**
     * [TEMPLATE] type slider
     */
    const classSkeleton = typeof window === 'undefined' ? 'full-width widget-product-list-skeleton' : 'full-width widget-product-list-skeleton hide';
    const classProductList = typeof window === 'undefined' ? 'full-width widget-product-list hide' : 'full-width widget-product-list';
    if (template === TEMPLATE_SLIDER && !dataLoading && dataItems?.length > 0) {
        return (
            <>
                <div className={classSkeleton}>
                    <SkeletonWidget />
                </div>
                <div className={classProductList}>
                    <Carousel enableQuickView={false} data={dataItems} Item={ProductItem} slideLg={dataItems?.length > 10 ? 6 : 4} />
                </div>
            </>
        );
    }

    /**
     * [TEMPLATE] type grid
     */
    if (template === TEMPLATE_GRID && !dataLoading && dataItems?.length > 0) {
        return (
            <>
                <div className={classSkeleton}>
                    <SkeletonWidget />
                </div>
                <div className={classProductList}>
                    <GridList
                        data={dataItems}
                        ItemComponent={ProductItem}
                        className="grid"
                        gridItemProps={{ xs: 6, sm: 4, md: modules.catalog.productListing.drawerFilterOnDesktop.enabled ? 3 : 2 }}
                    />
                </div>
            </>
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
