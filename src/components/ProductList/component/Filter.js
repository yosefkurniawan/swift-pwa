/* eslint-disable react/forbid-prop-types */
import React from 'react';
import FilterDialog from '@components/FilterDialog';
import PropTypes from 'prop-types';

const Filter = ({
    openFilter, setOpenFilter, setFilter, defaultValue = {}, elastic, filter, isSearch = false,
}) => {
    let sortByData;

    if (isSearch) {
        sortByData = [
            { value: JSON.stringify({ key: 'relevance', value: 'DESC' }), label: 'Relevance' },
            { value: JSON.stringify({ key: 'name', value: 'ASC' }), label: 'Alphabetically (A to Z)' },
            { value: JSON.stringify({ key: 'name', value: 'DESC' }), label: 'Alphabetically (Z to A)' },
            { value: JSON.stringify({ key: 'price', value: 'ASC' }), label: 'Price (Low to High)' },
            { value: JSON.stringify({ key: 'price', value: 'DESC' }), label: 'Price (High to Low)' },
        ];
    } else {
        sortByData = [
            { value: JSON.stringify({ key: 'position', value: 'ASC' }), label: 'Most Relevance' },
            { value: JSON.stringify({ key: 'name', value: 'ASC' }), label: 'Alphabetically (A to Z)' },
            { value: JSON.stringify({ key: 'name', value: 'DESC' }), label: 'Alphabetically (Z to A)' },
            { value: JSON.stringify({ key: 'price', value: 'ASC' }), label: 'Price (Low to High)' },
            { value: JSON.stringify({ key: 'price', value: 'DESC' }), label: 'Price (High to Low)' },
        ];
    }

    return (
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
};

Filter.propTypes = {
    setFilter: PropTypes.func.isRequired,
    setOpenFilter: PropTypes.func.isRequired,
    openFilter: PropTypes.bool.isRequired,
};

export default Filter;
