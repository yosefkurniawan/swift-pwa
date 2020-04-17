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
}) => {
    const classes = useStyles();
    const styles = {
        width: size,
        height: size,
        backgroundColor: color,
    };

    const customClass = classNames(classes.root, className);

    return <span className={customClass} style={styles} onClick={onClick} />;
};

export default ListColor;
