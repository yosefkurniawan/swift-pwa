/* eslint-disable no-underscore-dangle */
import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { formatPrice } from '@helpers/currency';
import { useTranslation } from '@i18n';
import getPrice from '../../../../../../helpers/getPrice';
import View from './view';
import { getCustomizableCheckboxOption } from '../../../../../../services/graphql/customizableSchema';

const CustomizableCheckboxOption = ({
    url_key, option_id, customizableOptions, setCustomizableOptions,
    errorCustomizableOptions,
    ...other
}) => {
    const { t } = useTranslation(['product']);
    const productPrice = getPrice(other.price);
    const [value, setValue] = useState([]);
    const [options, setOptions] = useState({});
    const [selected, setSelected] = useState([]);

    // get values options customizable
    const { data, loading } = useQuery(getCustomizableCheckboxOption(url_key), {
        skip: !url_key,
        fetchPolicy: 'no-cache',
    });

    const onChange = (val) => {
        let filterValues = [];
        if (val.length > 0) {
            filterValues = value.filter((item) => val.includes(item.value));
        }
        if (customizableOptions && customizableOptions.length > 0) {
            const removeOldOptions = customizableOptions.filter((item) => item.option_id !== options.option_id);
            setCustomizableOptions([
                ...removeOldOptions,
                ...filterValues,
            ]);
        } else {
            setCustomizableOptions(filterValues);
        }
        setSelected(val);
    };

    useMemo(() => {
        if (customizableOptions && customizableOptions.length > 0) {
            //
        }
    }, [customizableOptions]);

    useMemo(() => {
        if (data && data.products && data.products.items.length > 0) {
            const option = data.products.items[0].options.filter(
                (item) => item.option_id === option_id && item.__typename === 'CustomizableCheckboxOption',
            );
            if (option && option.length > 0) {
                setOptions(option[0]);
            }
            if (option && option[0] && option[0].value && option[0].value.length > 0) {
                const newvalue = option[0].value.map((item) => {
                    let { price } = item;
                    if (item.price_type === 'PERCENT') {
                        price = (productPrice * price) / 100;
                    }
                    return {
                        ...item,
                        option_id: option[0].option_id,
                        label: `${item.title} + ${formatPrice(price)}`,
                        value: JSON.stringify(item.option_type_id),
                        price,
                    };
                });
                setValue(newvalue);
            }
        }
    }, [data]);

    let error = '';
    useMemo(() => {
        if (options.option_id && errorCustomizableOptions.length > 0) {
            const findError = errorCustomizableOptions.filter((op) => op.option_id === options.option_id);
            if (findError && findError.length > 0) {
                error = t('product:validate:fieldRequired');
            }
        }
    }, [options, errorCustomizableOptions]);

    if (loading || !data) {
        return <p>Loading...</p>;
    }

    return (
        <View
            {...other}
            data={value}
            selected={selected}
            onChange={onChange}
            error={error}
        />
    );
};

export default CustomizableCheckboxOption;
