/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import useStyles from '@common_forms/Radio/style';
import Typography from '@common_typography';
import { getLocalStorage } from '@helper_localstorage';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import classNames from 'classnames';
import React from 'react';

const RadioItem = (props) => {
    const styles = useStyles();
    const { value, label, className } = props;
    const customStyle = classNames(styles.radioContainer, className);
    return <FormControlLabel value={value || ''} control={<Radio color="default" size="small" />} label={label || ''} className={customStyle} />;
};

// Inspired by blueprintjs
function CustomRadio({
    valueData = [],
    onChange = () => {},
    value = '',
    name = 'radio',
    ariaLabel = 'radio',
    label = '',
    CustomItem,
    className = {},
    classContainer = {},
    classItem = {},
    flex = 'column',
    error = false,
    errorMessage = '',
    propsItem = {},
    disabled = false,
    ComponentOptional = () => {},
    storeConfig,
    isShipping = false,
}) {
    const storeConfigLocalStorage = getLocalStorage('storeConfig');
    const checkoutShippingMethod = getLocalStorage('checkout_shipping_method');
    const styles = useStyles();

    const rootStyle = classNames(styles.root, className);
    const containerStyle = classNames(styles[flex], classContainer, styles.error);

    const handleChange = (event) => {
        !disabled && onChange(event.target.value);
    };

    const handleChangeCustom = (val) => {
        !disabled && onChange(val);
    };
    return (
        <div className={rootStyle}>
            <Typography variant="label" type="bold" letter="uppercase">
                {label}
            </Typography>
            <RadioGroup
                aria-label={ariaLabel}
                name={name}
                value={value}
                onChange={handleChange}
                classes={{
                    root: containerStyle,
                }}
            >
                {valueData.map((item, index) => {
                    if (CustomItem) {
                        if (storeConfigLocalStorage.enable_oms_multiseller === '1') {
                            let isTrue;
                            let itemValue;

                            if (isShipping) {
                                if (value[0].seller_id === null) {
                                    if (checkoutShippingMethod.length === value.length) {
                                        if (checkoutShippingMethod[0].name.method_code === value[0].name.method_code) {
                                            itemValue = `${item.value.split('_')[1]}_${item.value.split('_')[2]}`;
                                            isTrue = itemValue === `${checkoutShippingMethod.find((items) => items.seller_id === item.value.split('_')[2]).name.method_code}_${checkoutShippingMethod.find((items) => items.seller_id === item.value.split('_')[2]).seller_id}`;
                                            return (
                                                <>
                                                    <CustomItem
                                                        key={index}
                                                        {...item}
                                                        selected={isTrue}
                                                        onChange={handleChangeCustom}
                                                        className={classItem}
                                                        storeConfig={storeConfig}
                                                        {...propsItem}
                                                    />
                                                    {ComponentOptional(item)}
                                                </>
                                            );
                                        }
                                    }
                                }

                                itemValue = `${item.value.split('_')[1]}_${item.value.split('_')[2]}`;
                                isTrue = itemValue === `${value.find((items) => items.seller_id === item.value.split('_')[2]).name.method_code}_${value.find((items) => items.seller_id === item.value.split('_')[2]).seller_id}`;
                                return (
                                    <>
                                        <CustomItem
                                            key={index}
                                            {...item}
                                            selected={isTrue}
                                            onChange={handleChangeCustom}
                                            className={classItem}
                                            storeConfig={storeConfig}
                                            {...propsItem}
                                        />
                                        {ComponentOptional(item)}
                                    </>
                                );
                            }

                            return (
                                <>
                                    <CustomItem
                                        key={index}
                                        {...item}
                                        selected={JSON.stringify(value) === JSON.stringify(item.value)}
                                        onChange={handleChangeCustom}
                                        className={classItem}
                                        storeConfig={storeConfig}
                                        {...propsItem}
                                    />
                                    {ComponentOptional(item)}
                                </>
                            );
                        }
                        return (
                            <>
                                <CustomItem
                                    key={index}
                                    {...item}
                                    selected={JSON.stringify(value) === JSON.stringify(item.value)}
                                    onChange={handleChangeCustom}
                                    className={classItem}
                                    storeConfig={storeConfig}
                                    {...propsItem}
                                />
                                {ComponentOptional(item)}
                            </>
                        );
                    }
                    return <RadioItem key={index} {...item} {...propsItem} className={classItem} />;
                })}
            </RadioGroup>
            {error && (
                <Typography variant="p" color="red">
                    {errorMessage}
                </Typography>
            )}
        </div>
    );
}

export default CustomRadio;
