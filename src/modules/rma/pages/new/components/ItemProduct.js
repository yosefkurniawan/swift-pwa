import React from 'react';

const ItemProduct = (props) => {
    const {
        qty_returnable, dataValues, value, onChange, formData,
        ItemProductView, setFormData, t, ...other
    } = props;
    const checked = dataValues.indexOf(value) !== -1;
    const [selectedData, setSelectedData] = React.useState({
        item_id: '',
        qty: 1,
        custom_fields: [],
    });
    const changeSelectedItem = (param) => {
        let allField = formData.order_items;
        const findField = formData.order_items.find((item) => param.item_id === item.item_id);
        if (findField) {
            allField = formData.order_items.filter((item) => item.item_id !== param.item_id);
            allField.push(param);
        } else {
            allField.push(param);
        }
        setFormData({
            ...formData,
            order_items: allField,
        });
    };
    const handleChange = () => {
        onChange(value);
        let allField = formData.order_items;
        const findField = formData.order_items.find((item) => value === item.item_id);
        if (findField) {
            allField = allField.filter((item) => item.item_id !== value);
            setFormData({
                ...formData,
                order_items: allField,
            });
        } else {
            setSelectedData({
                ...selectedData,
                item_id: value,
            });
            changeSelectedItem({
                ...selectedData,
                item_id: value,
            });
        }
    };
    const optionQty = [];
    if (qty_returnable > 0) {
        for (let index = 1; index <= qty_returnable; index += 1) {
            optionQty.push({
                label: index,
                value: index,
            });
        }
    }
    const handleQty = (param) => {
        setSelectedData({
            ...selectedData,
            qty: param.value,
        });
        changeSelectedItem({
            ...selectedData,
            qty: param.value,
        });
    };

    const changeOptionCustomField = (param) => {
        let allField = selectedData.custom_fields;
        const findField = selectedData.custom_fields.find((item) => param.field_id === item.field_id);
        if (findField) {
            allField = selectedData.custom_fields.filter((item) => item.field_id !== param.field_id);
            allField.push(param);
        } else {
            allField.push(param);
        }
        setSelectedData({
            ...selectedData,
            custom_fields: allField,
        });
        changeSelectedItem({
            ...selectedData,
            custom_fields: allField,
        });
    };

    return (
        <ItemProductView
            changeOptionCustomField={changeOptionCustomField}
            handleQty={handleQty}
            optionQty={optionQty}
            handleChange={handleChange}
            t={t}
            checked={checked}
            {...other}
        />
    );
};

export default ItemProduct;
