/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
/* eslint-disable no-return-assign */
/* eslint-disable import/named */
/* eslint-disable no-param-reassign */
import TextField from '@components/Forms/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import Loading from '@material-ui/core/CircularProgress';
import SelectIcon from '@material-ui/icons/ArrowDropDown';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import classNames from 'classnames';
import Typography from '@components/Typography';
import useStyles from './style';

const Select = ({
    label = '',
    name = '',
    // errorMessage = '',
    graphql,
    // optionsData = [],
    initialOption,
}) => {
    const styles = useStyles();
    const [value, setValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    let options = [];
    let loading = false;
    if (graphql) {
        const { load, data, error } = graphql();
        if (load || !data) loading = true;
        if (error) return (loading = true);
        if (data) options = data.countries;
    }

    const [optionData, setOptionData] = React.useState(options);

    const handleChange = (event) => {
        const values = event.target.value;
        let newOptionFilter = [];
        if (values !== '') {
            newOptionFilter = optionData.filter((option) => {
                if (
                    option[initialOption.label]
          && (option[initialOption.label].indexOf(values) > -1
            || option[initialOption.label].toLowerCase().indexOf(values) > -1)
                ) return true;
            });
        } else {
            newOptionFilter = options;
        }
        setValue(values);
        setOptionData(newOptionFilter);
        setOpen(values !== '');
    };

    const handleSelect = (item) => {
        setOpen(false);
        setValue(item[initialOption.label]);
    };
    return (
        <div className="relative">
            <TextField
                name={name}
                label={label}
                value={value}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    endAdornment: loading ? <Loading /> : <SelectIcon />,
                }}
                disabled={loading}
                error={false}
                fullWidth
            />
            <div className={open ? classNames('show', styles.selectBox) : 'hide'}>
                <List component="nav" aria-label="option country">
                    {optionData.length > 0
            && optionData.map((item, index) => (
                <ListItem key={index} onClick={() => handleSelect(item)}>
                    <Typography>{item[initialOption.label]}</Typography>
                </ListItem>
            ))}
                </List>
            </div>
        </div>
    );
};

export default Select;
