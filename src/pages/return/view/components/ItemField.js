/* eslint-disable jsx-a11y/anchor-is-valid */
import Select from '@components/Forms/Select';
import { useTranslation } from '@i18n';

const ItemField = ({
    options = [],
    name = 'select',
    label = 'Select',
    onSelect = () => {},
    propsValue = {},
    errorForm = false,
    errorMessage = '',
    defaultValue = '',
    required,
    ...other
}) => {
    const { t } = useTranslation(['return']);
    const [select, setSelect] = React.useState(defaultValue);
    const handleSelect = (event) => {
        setSelect(event.target.value);
        onSelect({
            ...propsValue,
            value: event.target.value,
        });
    };
    let error = false;
    if (errorForm && required) {
        if (select === '' || select.length === 0) error = true;
    }
    return (
        <Select
            options={options}
            name={name}
            label={label}
            value={select}
            onChange={handleSelect}
            error={error}
            errorMessage={errorMessage || t('return:form:required')}
            {...other}
        />
    );
};

export default ItemField;
