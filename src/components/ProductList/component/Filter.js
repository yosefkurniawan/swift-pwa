/* eslint-disable react/forbid-prop-types */
import React from 'react';
import FilterDialog from '@components/FilterDialog';
import PropTypes from 'prop-types';


const sortByData = [
    { value: JSON.stringify({ key: 'relevance', value: 'DESC' }), label: 'Popularity' },
    { value: JSON.stringify({ key: 'position', value: 'DESC' }), label: 'New Item' },
    { value: JSON.stringify({ key: 'price', value: 'DESC' }), label: 'price (Hight to Low)' },
    { value: JSON.stringify({ key: 'price', value: 'ASC' }), label: 'Price (Low to Hight)' },
];

const Filter = ({
    openFilter, setOpenFilter, setFilter, defaultValue = {}, elastic, filter,
}) => (
    <FilterDialog
        defaultValue={defaultValue}
        open={openFilter}
        sortByData={sortByData}
        elastic={elastic}
        setOpen={() => setOpenFilter(!openFilter)}
        loading={filter.loading}
        data={filter}
        getValue={(v) => setFilter(v)}
    />
);

Filter.propTypes = {
    setFilter: PropTypes.func.isRequired,
    setOpenFilter: PropTypes.func.isRequired,
    openFilter: PropTypes.bool.isRequired,
};

export default Filter;
