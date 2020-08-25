import React from 'react';

const Filter = (props) => {
    const {
        FilterModalView, FilterView, filterValue, isSearch, defaultSort, setFiltervalue, ...other
    } = props;
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

    const [openFilter, setOpenFilter] = React.useState(false);
    const [selectedFilter, setFilter] = React.useState(filterValue);
    const [sort, setSort] = React.useState(filterValue.sort ? filterValue.sort : '');
    const [priceRange, setPriceRange] = React.useState(filterValue.priceRange ? filterValue.priceRange.split(',') : [0, 0]);
    const handleClear = () => {
        // reset value for sort component
        setSort(defaultSort || '');

        // reset value for price range component
        setPriceRange([0, 0]);

        // new filter with clear/reset value
        const newFilter = {
            q: selectedFilter.q,
            sort: defaultSort,
            priceRange: [0, 0],
        };

        // delete params when empty value, ex: ...?q=undefined...
        Object.keys(newFilter).forEach((key) => {
            const emptyValues = [undefined, null, '', 'undefined', 'null'];
            if (emptyValues.includes(newFilter[key])) {
                delete newFilter[key];
            }
        });

        setFiltervalue(newFilter);
    };

    const handleSave = () => {
        if (selectedFilter.priceRange) {
            delete selectedFilter.priceRange;
        }

        if (selectedFilter.sort) {
            delete selectedFilter.sort;
        }
        const savedData = {
            selectedFilter,
        };
        if (sort !== '') {
            savedData.sort = sort;
        }
        if (priceRange[1] !== 0) {
            savedData.priceRange = priceRange;
        }
        setFiltervalue(savedData);
        setOpenFilter(!openFilter);
    };

    const setCheckedFilter = (name, value) => {
        let selected = '';
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < value.length; index++) {
            selected += `${index !== 0 ? ',' : ''}${value[index]}`;
        }
        selectedFilter[name] = selected;
        setFilter({ ...selectedFilter });
    };

    const setSelectedFilter = (code, value) => {
        selectedFilter[code] = value;
        setFilter({ ...selectedFilter });
    };

    const ModalProps = {
        selectedFilter, setSelectedFilter, setCheckedFilter, handleSave, handleClear, sortByData, sort, setSort, priceRange, setPriceRange,
    };

    return (
        <>
            {FilterModalView ? (
                <FilterModalView
                    open={openFilter}
                    setOpen={() => setOpenFilter(!openFilter)}
                    {...props}
                    {...ModalProps}
                />
            ) : null}

            <FilterView
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                {...ModalProps}
                {...other}
            />
        </>
    );
};

export default Filter;
