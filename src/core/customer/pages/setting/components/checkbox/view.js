import Checkbox from '@common_checkbox';

const CheckboxView = ({
    t, data, value, handleChange,
}) => (
    <Checkbox
        label={t('customer:setting:newslater')}
        flex="column"
        data={data}
        value={value}
        onChange={handleChange}
    />
);

export default CheckboxView;
