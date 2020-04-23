/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        borderRadius: 100,
    },
}));

const ListColor = ({
    onClick = () => {},
    color = '#000',
    size = 20,
    className = {},
    value = '',
}) => {
    const classes = useStyles();
    const styles = {
        cursor: 'pointer',
        width: size,
        height: size,
        backgroundColor: color,
    };

    if (value === color) {
        styles.border = '1px solid #000';
    }

    const customClass = classNames(classes.root, className);

    return <span className={customClass} style={styles} onClick={() => onClick('color', color)} />;
};

export default ListColor;
