/* eslint-disable arrow-body-style */
/* eslint-disable no-return-assign */
/* eslint-disable import/named */
/* eslint-disable no-param-reassign */
import Input from '@components/Forms/TextField';
import React from 'react';

const Select = ({
    label = '',
    name = '',
    // errorMessage = '',
    // graphql,
    // optionsData = [],
    // initialOption,
}) => {
    // const [value, setValue] = React.useState('');
    // if (graphql) {
    //     const { load, data, error } = graphql();
    //     if (load || !data) console.log('load data');
    //     if (error) console.log('error');
    //     if (data) options = data.countries;
    // }

    // const optionValue = initialOption && initialOption.value
    //     ? (option, value) => (option[initialOption.value] = value[initialOption.value])
    //     : (option, value) => (option = value);

    // const optionLabel = initialOption && initialOption.label
    //     ? (option) => option[initialOption.label]
    //     : (option) => option;

    // React.useEffect(() => {
    //     let active = true;

    //     if (!loading) {
    //         return undefined;
    //     }

    //     (async () => {
    //         const response = await fetch(
    //             'https://country.register.gov.uk/records.json?page-size=5000',
    //         );
    //         const countries = await response.json();
    //         console.log(countries);
    //         if (active) {
    //             setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
    //         }
    //     })();

    //     return () => {
    //         active = false;
    //     };
    // }, [loading]);

    // React.useEffect(() => {
    //     if (!open) {
    //         setOptions([]);
    //     }
    // }, [open]);

    return (
        <div>
            <Input name={name} label={label} />
        </div>
    // <Autocomplete
    //     id="select-custom"
    //     open={open}
    //     onOpen={() => {
    //         setOpen(true);
    //     }}
    //     onClose={() => {
    //         setOpen(false);
    //     }}
    //     getOptionSelected={optionValue}
    //     getOptionLabel={optionLabel}
    //     options={options}
    //     loading={loading}
    //     renderInput={(params) => (
    //         <TextField
    //             {...params}
    //             name={name}
    //             label={label}
    //             InputLabelProps={{ shrink: true }}
    //             InputProps={{
    //                 ...params.InputProps,
    //                 endAdornment: (
    //                     <>
    //                         {loading ? (
    //                             <CircularProgress color="inherit" size={20} />
    //                         ) : null}
    //                         {params.InputProps.endAdornment}
    //                     </>
    //                 ),
    //             }}
    //             error={false}
    //             helperText={errorMessage}
    //             fullWidth
    //         />
    //     )}
    // />
    );
};

export default Select;
