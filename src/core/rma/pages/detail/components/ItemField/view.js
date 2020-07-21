import Select from '@Select';
import Typography from '@Typography';

const ItemFieldView = ({
    item, error, options, name, label,
    select, handleSelect, errorMessage,
    fieldValue, t,
}) => (
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
                />
            ) : (
                <Typography variant="span">
                    {fieldValue[0].valueLabel}
                </Typography>
            )
        }
    </>
);

export default ItemFieldView;
