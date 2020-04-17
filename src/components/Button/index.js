import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Router from 'next/router';
import useStyles from './style';

const CustomButton = ({
    className = {},
    variant = 'contained',
    color = 'primary',
    children,
    disabled = false,
    fullWidth = false,
    onClick = () => {},
    href = '',
    ...other
}) => {
    const styles = useStyles();
    const customClass = classNames(
        styles.container,
        fullWidth && styles.fullWidth,
        className,
    );
    return (
        <Button
            onClick={href !== '' && href ? () => Router.push(href) : onClick}
            variant={variant}
            color={color}
            className={customClass}
            disabled={disabled}
            {...other}
        >
            {children}
        </Button>
    );
};

export default CustomButton;
