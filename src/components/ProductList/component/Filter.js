/* eslint-disable react/forbid-prop-types */
import React from 'react';
import FilterDialog from '@components/FilterDialog';
import PropTypes from 'prop-types';


const sortByData = [
    { value: JSON.stringify({ key: 'relevance', value: 'DESC' }), label: 'Relevance' },
    { value: JSON.stringify({ key: 'name', value: 'ASC' }), label: 'Alphabetically (A to Z)' },
    { value: JSON.stringify({ key: 'name', value: 'DESC' }), label: 'Alphabetically (Z to A)' },
    { value: JSON.stringify({ key: 'price', value: 'ASC' }), label: 'Price (Low to High)' },
    { value: JSON.stringify({ key: 'price', value: 'DESC' }), label: 'Price (High to Low)' },
    { value: JSON.stringify({ key: 'position', value: 'DESC' }), label: 'New Item' },
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
