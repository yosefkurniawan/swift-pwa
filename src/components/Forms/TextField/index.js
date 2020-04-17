import { FormControl, Input, InputLabel } from '@material-ui/core';
import classNames from 'classnames';
import React, { useState } from 'react';
import Typography from '@components/Typography';
import useStyles from './style';

const CustomTextField = ({
    placeholder = '',
    disabled = false,
    onChange = () => {},
    value = '',
    className = '',
    label = '',
    fullWidth = true,
    shrink = true,
    error = false,
    errorMessage = '',
    variant = 'standard',
    footer,
    ...other
}) => {
    const styles = useStyles();
    const [localValue, setValue] = useState(value);
    const onChangeText = (event) => {
        const { target } = event;
        setValue(target.value);
        onChange(target.value);
    };
    const customClass = classNames(styles.container, className);
    return (
        <FormControl
            disabled={disabled}
            fullWidth={fullWidth}
            error={error}
            variant={variant}
            className={customClass}
        >
            <InputLabel shrink={shrink} htmlFor={label} className={styles.label}>
                {label}
            </InputLabel>
            <Input
                id={label}
                value={localValue}
                onChange={onChangeText}
                placeholder={placeholder}
                {...other}
            />
            {React.isValidElement(footer) ? (
                footer
            ) : (
                <Typography variant="p" color={error ? 'red' : 'default'}>
                    {errorMessage}
                </Typography>
            )}
        </FormControl>
    );
};

export default CustomTextField;
