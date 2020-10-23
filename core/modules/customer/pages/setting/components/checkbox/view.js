import Checkbox from '@common_checkbox';

const CheckboxView = ({
    t, data, value, onChange,
}) => (
    <Checkbox
        label={t('customer:setting:newsletter')}
        flex="column"
        data={data}
        value={value}
        onChange={onChange}
    />
);

export default CheckboxView;
