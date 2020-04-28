/* eslint-disable no-nested-ternary */
import CustomRadio from '@components/Forms/Radio';
import SelectColor from '@components/Forms/SelectColor';
import SelectSize from '@components/Forms/SelectSize';
import {
    FormControl, InputLabel, MenuItem, Select,
} from '@material-ui/core';
import React from 'react';
import ProductByVariant from '@helpers/productByVariant';
import { getConfigurableProduct } from '../../services/graphql';
import useStyles from './style';

export default (props) => {
    const {
        data: { sku },
        setBanner,
        setPrice,
    } = props;
    const styles = useStyles();
    const [selected, setSelected] = React.useState({});

    const { data } = getConfigurableProduct(sku);

    let optionData = [];
    if (data) {
        optionData = data.products.items[0].configurable_options.map(
            (config) => {
                const values = config.values.map((val) => ({
                    label: val.label,
                    value: val.label,
                }));
                return {
                    ...config,
                    values,
                };
            },
        );
    }

    const handleSelect = (value, key) => {
        const options = selected;
        options[key] = value;
        setSelected({
            ...selected,
            [key]: value,
        });
        const product = ProductByVariant(
            options,
            data.products.items[0].variants,
        );
        const bannerData = product.media_gallery.map((media) => ({
            link: '#',
            imageUrl: media.url,
        }));
        setBanner(bannerData);
        setPrice({
            priceRange: product.price_range,
            priceTiers: product.price_tiers,
            // eslint-disable-next-line no-underscore-dangle
            productType: product.__typename,
        });
    };

    console.log(selected);

    return (
        <>
            {optionData.map((option, index) => (option.attribute_code === 'color' ? (
                <CustomRadio
                    key={index}
                    label="Select color"
                    flex="row"
                    CustomItem={SelectColor}
                    value={selected[option.attribute_code]}
                    valueData={option.values}
                    onChange={(val) => handleSelect(val, option.attribute_code)}
                    className={styles.label}
                    classContainer={styles.center}
                />
            ) : option.attribute_code === 'size' ? (
                <CustomRadio
                    key={index}
                    label="Select size"
                    flex="row"
                    CustomItem={SelectSize}
                    value={selected[option.attribute_code]}
                    valueData={option.values}
                    onChange={(val) => handleSelect(val, option.attribute_code)}
                    className={styles.sizeContainer}
                    classContainer={styles.center}
                />
            ) : (
                <FormControl key={index} className={styles.select}>
                    <InputLabel htmlFor={`select-${option.label}`}>
                        {`Select ${option.label}`}
                    </InputLabel>
                    <Select
                        id={`select-${option.label}`}
                        value={selected[option.attribute_code]}
                        onChange={(val) => handleSelect(val, option.attribute_code)}
                        label={`Select ${option.label}`}
                    >
                        {option.values.map((val, key) => (
                            <MenuItem key={key} value={val.label}>
                                {val.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )))}
        </>
    );
};
