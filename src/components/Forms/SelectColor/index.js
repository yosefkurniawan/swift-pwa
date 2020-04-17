/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import useStyles from './style';

const SelectColor = ({ value, selected, onChange }) => {
    const styles = useStyles();
    const containerStyle = selected
        ? classNames(styles.container, styles.bordered)
        : styles.container;
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
