/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Typograpy from '@components/Typography';
import classNames from 'classnames';
import useStyles from './style';

const SelectSize = ({
    selected,
    value = '',
    label = '',
    className = '',
    onChange = () => {},
}) => {
    const styles = useStyles();
    const handleChange = () => {
        onChange(value);
    };

    const containerStyle = selected
        ? classNames(styles.container, styles.active, className)
        : classNames(styles.container, className);
    const labelStyle = selected
        ? classNames(styles.label, styles.labelActive)
        : styles.label;

    return (
        <div className={containerStyle} onClick={handleChange}>
            <Typograpy className={labelStyle}>{label}</Typograpy>
        </div>
    );
};

export default SelectSize;
