import React from 'react';
import FilterDialog from '@components/FilterDialog';
import PropTypes from 'prop-types';
import { getFilter } from '../services';

const radioData = [
    { value: JSON.stringify({ key: 'relevance', value: 'DESC' }), label: 'Popularity' },
    { value: JSON.stringify({ key: 'position', value: 'DESC' }), label: 'New Item' },
    { value: JSON.stringify({ key: 'price', value: 'DESC' }), label: 'price (Hight to Low)' },
    { value: JSON.stringify({ key: 'price', value: 'ASC' }), label: 'Price (Low to Hight)' },
];

const getFilterAttribute = (catId) => {
    const filter = {
        selectBrand: false,
        selectBrandData: [],
        sortByData: radioData,
        selectSizeData: [],
        selectColorData: [],
        priceRangeMaxValue: 0,
        priceRangeValue: [0, 0],
    };
    const { loading, data } = getFilter(catId);
    if (loading) {
        return filter;
    }
    for (
        let index = 0;
        index < data.getFilterAttributeOptions.data.length;
        // eslint-disable-next-line no-plusplus
        index++
    ) {
        const attributeFilter = data.getFilterAttributeOptions.data[index];
        if (attributeFilter.field === 'price') {
            // filter.priceRangeMaxValue = attributeFilter.maxprice;
            filter.priceRangeValue = [
                attributeFilter.minprice,
                attributeFilter.maxprice,
            ];
        }

        if (attributeFilter.field === 'color') {
            const color = [];
            // eslint-disable-next-line no-plusplus
            for (let idx = 0; idx < attributeFilter.value.length; idx++) {
                color.push(attributeFilter.value[idx].label);
            }
            filter.selectColorData = color;
        }

        if (attributeFilter.field === 'size') {
            const size = [];
            // eslint-disable-next-line no-plusplus
            for (let idx = 0; idx < attributeFilter.value.length; idx++) {
                size.push(attributeFilter.value[idx].label);
            }
            filter.selectSizeData = size;
        }
    }
    return filter;
};

const Filter = ({
    openFilter, catId, setOpenFilter, setFilter,
}) => {
    // get filter value attribute
    const filter = getFilterAttribute(catId);
    return (
        <FilterDialog
            open={openFilter}
            setOpen={() => setOpenFilter(!openFilter)}
            itemProps={filter}
            getValue={(v) => setFilter(v)}
        />
    );
};

Filter.propTypes = {
    setFilter: PropTypes.func.isRequired,
    setOpenFilter: PropTypes.func.isRequired,
    catId: PropTypes.number.isRequired,
    openFilter: PropTypes.bool.isRequired,
};

export default Filter;
