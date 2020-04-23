import React from 'react';
import FilterDialog from '@components/FilterDialog';
import PropTypes from 'prop-types';
import { getFilter } from '../services';

const sortByData = [
    { value: JSON.stringify({ key: 'relevance', value: 'DESC' }), label: 'Popularity' },
    { value: JSON.stringify({ key: 'position', value: 'DESC' }), label: 'New Item' },
    { value: JSON.stringify({ key: 'price', value: 'DESC' }), label: 'price (Hight to Low)' },
    { value: JSON.stringify({ key: 'price', value: 'ASC' }), label: 'Price (Low to Hight)' },
];

const getFilterAttribute = (catId) => getFilter(catId);

const Filter = ({
    openFilter, catId, setOpenFilter, setFilter,
}) => {
    // get filter value attribute
    const filter = getFilterAttribute(catId);
    return (
        <FilterDialog
            open={openFilter}
            sortByData={sortByData}
            setOpen={() => setOpenFilter(!openFilter)}
            loading={filter.loading}
            data={filter.data}
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
