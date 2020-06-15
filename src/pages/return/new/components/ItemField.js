/* eslint-disable jsx-a11y/anchor-is-valid */
import Select from '@components/Forms/Select';

const ItemField = ({
    options = [],
    name = 'select',
    label = 'Select',
    onSelect = () => {},
    propsValue = {},
}) => {
    const [select, setSelect] = React.useState('');
    const handleSelect = (event) => {
        setSelect(event.target.value);
        onSelect({
            ...propsValue,
            value: event.target.value,
        });
    };
    return (
        <Select
            options={options}
            name={name}
            label={label}
            value={select}
            onChange={handleSelect}
        />
    );
};

export default ItemField;
