import Checkbox from '@components/Forms/CheckBox';


const CheckboxSettings = ({
    t, value, data, setSettings, name,
}) => {
    const [checkData, setCheckData] = React.useState(value);
    const handleChange = (val) => {
        setCheckData({ ...val });
        const settings = {};
        settings[name] = val.length === 1;
        setSettings({ ...settings });
    };
    return (
        <Checkbox
            label={t('customer:setting:newslater')}
            flex="column"
            data={data}
            value={checkData}
            onChange={handleChange}
        />
    );
};

export default CheckboxSettings;
