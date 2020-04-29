/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import useStyles from './style';

const SelectColor = ({
    value, selected, onChange, className = '',
}) => {
    const styles = useStyles();
    const containerStyle = selected
        ? classNames(styles.container, value.toLowerCase() === 'black' || value.toLowerCase() === '#000000'
            ? styles.borderedSecondary : styles.bordered, className)
        : classNames(styles.container, className);
    const customStyle = {
        backgroundColor: value,
    };
    const handleChange = () => {
        onChange(value);
    };
    return (
        <div
            className={containerStyle}
            style={customStyle}
            onClick={handleChange}
        />
    );
};

export default SelectColor;
