import { useReactiveVar } from '@apollo/client';
import { storeConfigVar } from '@root/core/services/graphql/cache';
import React from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import useStyles from '@common_textfield/style';
import Typography from '@common_typography';
import 'react-phone-number-input/style.css';

const PhoneInput = dynamic(() => import('react-phone-number-input'));

const CustomTextField = ({
    type = null,
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
    loading = false,
    footer,
    ...other
}) => {
    const styles = useStyles();
    const customClass = classNames(styles.container, className);
    const pwaConfig = useReactiveVar(storeConfigVar);

    let customTextFieldInput = (
        <FormControl disabled={disabled || loading} fullWidth={fullWidth} error={error} variant={variant} className={customClass}>
            <InputLabel shrink={shrink} htmlFor={label} className={styles.label}>
                {label}
            </InputLabel>
            <Input
                // id={label}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                endAdornment={<>{loading ? <CircularProgress color="inherit" size={20} /> : null}</>}
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
    if (type === 'phone') {
        let inputValue = value;
        if (value && value !== '' && value[0] === '0') {
            inputValue = `+62${inputValue.substring(1)}`;
        }
        customTextFieldInput = (
            <>
                <FormControl disabled={disabled || loading} fullWidth={fullWidth} error={error} variant={variant} className={customClass}>
                    <InputLabel shrink={shrink} htmlFor={label} className={styles.label}>
                        {label}
                    </InputLabel>

                    <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry={pwaConfig && pwaConfig.general_country_default}
                        value={inputValue}
                        onChange={onChange}
                    />

                    {React.isValidElement(footer) ? (
                        footer
                    ) : (
                        <Typography variant="p" color={error ? 'red' : 'default'}>
                            {errorMessage}
                        </Typography>
                    )}
                </FormControl>
                <style jsx global>
                    {`
                        .PhoneInput {
                            margin-top: 20px;
                        }
                        .PhoneInputInput {
                            border: none;
                            border-bottom: 1px solid grey;
                            font-size: 16px;
                            padding: 5px 0px;
                        }

                        .PhoneInputInput:focus {
                            outline: none;
                            border-bottom: 2px solid #000000;
                        }

                        .PhoneInputInput:hover {
                            border-bottom: 2px solid #000000;
                        }
                    `}
                </style>
            </>
        );
    }
    return customTextFieldInput;
};

export default CustomTextField;
