import Typography from '@components/Typography';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import classNames from 'classnames';
import useStyles from './style';

const CheckDefault = ({
    label = '',
    name = '',
    value = '',
    dataValues = [],
    onChange = () => {},
}) => {
    const findVal = dataValues.find((element) => element.value === value);
    const checked = !!(findVal !== '' && findVal !== undefined && findVal);
    const handleChange = () => {
        let newValue = dataValues;
        if (checked === true) {
            newValue = newValue.filter((element) => element.value !== value);
        } else {
            newValue = [...newValue, { label, value }];
        }
        onChange(newValue);
    };
    return (
        <FormControlLabel
            control={(
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name={name}
                    color="primary"
                    size="small"
                />
            )}
            label={label}
        />
    );
};

const CustomCheckbox = ({
    label = 'label',
    data = [],
    value = [],
    flex = 'row',
    CustomItem,
    onChange = () => {},
}) => {
    const styles = useStyles();
    const [selected, setSelected] = React.useState(value);
    const checkStyle = classNames(styles[flex], styles.checkboxContainer);

    // eslint-disable-next-line no-shadow
    const setCheckedFilter = (value) => {
        if (selected.indexOf(value) !== -1) {
            selected.splice(selected.indexOf(value), 1);
        } else {
            selected.push(value);
        }
        onChange(selected);
        setSelected([...selected]);
    };
    return (
        <div className={styles.container}>
            <Typography variant="label" type="bold" letter="uppercase">
                {label}
            </Typography>
            <div className={checkStyle}>
                {data.map((item, index) => (CustomItem ? (
                    <CustomItem
                        label={item.label ? item.label : item}
                        value={item.value ? item.value : item}
                        dataValues={selected}
                        key={index}
                        onChange={(val) => setCheckedFilter(val)}
                    />
                ) : (
                    <CheckDefault
                        label={item.label ? item.label : item}
                        value={item.value ? item.value : item}
                        dataValues={value}
                        key={index}
                        onChange={onChange}
                    />
                )))}
            </div>
        </div>
    );
};

export default CustomCheckbox;
