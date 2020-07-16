/* eslint-disable jsx-a11y/anchor-is-valid */
import Select from '@components/Forms/Select';
import Typography from '@components/Typography';

const ItemField = ({
    options = [],
    name = 'select',
    label = 'Select',
    onSelect = () => {},
    item,
    errorForm = false,
    errorMessage = '',
    fieldValue = [''],
    required,
    t,
    ...other
}) => {
    const [select, setSelect] = React.useState(fieldValue[0].value || '');
    const handleSelect = (event) => {
        setSelect(event.target.value);
        onSelect({
            field_id: item.id,
            value: event.target.value,
        });
    };
    let error = false;
    if (errorForm && item.is_required) {
        if (select === '' || select.length === 0) error = true;
    }
    return (
        <>
            <Typography variant="title" letter="uppercase" type="bold">
                {item.frontend_labels[0].value}
            </Typography>
            {
                item.is_editable ? (
                    <Select
                        options={options}
                        name={name}
                        label={label}
                        value={select}
                        onChange={handleSelect}
                        error={error}
                        errorMessage={errorMessage || t('return:form:required')}
                        showLabel={false}
                        {...other}
                    />
                ) : (
                    <Typography variant="span">
                        {fieldValue[0].valueLabel}
                    </Typography>
                )
            }
        </>
    );
};

export default ItemField;
