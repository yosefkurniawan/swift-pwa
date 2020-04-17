/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import useStyles from './style';

const ChecboxColor = ({
    label = '',
    value = '',
    dataValues = [],
    onChange = () => {},
}) => {
    const styles = useStyles();
    const findVal = dataValues.find((element) => element.value === value);
    const checked = !!((findVal !== '' && findVal !== undefined && findVal));

    const handleChange = () => {
        let newValue = dataValues;
        if (checked === true) {
            newValue = newValue.filter((element) => element.value !== value);
        } else {
            newValue = [...newValue, { label, value }];
        }
        onChange(newValue);
    };

    const containerStyle = checked
        ? classNames(styles.container, styles.active)
        : styles.container;
    const customStyle = {
        backgroundColor: `${value || '#fff'}`,
    };

    return (
        <div
            className={containerStyle}
            onClick={handleChange}
            style={customStyle}
        />
    );
};

export default ChecboxColor;
