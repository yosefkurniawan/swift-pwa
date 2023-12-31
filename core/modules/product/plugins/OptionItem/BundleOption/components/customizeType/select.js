/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-danger */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { formatPrice } from '@helper_currency';
import useStyles from '@plugin_optionitem/BundleOption/style';
import React from 'react';

const SelectItem = ({
    data, options = [], selectOptions, currencyCache, dynamicPrice,
}) => {
    const styles = useStyles();
    const defaultValue = React.useMemo(() => {
        let tempValue = 0;
        if (options && options.length > 0) {
            for (let index = 0; index < options.length; index++) {
                const element = options[index];
                if (element.is_default) {
                    tempValue = element.id;
                }
            }
        }
        return tempValue;
    }, [options]);

    return (
        <FormControl className={styles.selectItem}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={defaultValue}
                onChange={(e) => selectOptions(data, parseInt(e.target.value))}
            >
                {}
                {options
                    .filter((opt) => opt.label != null || opt.product != null)
                    .map((val, idx) => (
                        <MenuItem key={idx} value={val.id}>
                            <label
                                className="label-options"
                                dangerouslySetInnerHTML={{
                                    __html: `${val.label} + <b>${formatPrice(dynamicPrice === false
                                        ? val.price
                                        : val.product.price_range.minimum_price.final_price.value,
                                    val.product.price_range.minimum_price.final_price.currency,
                                    currencyCache)}</b>`,
                                }}
                            />
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
};

export default SelectItem;
