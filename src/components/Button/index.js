import { CircularProgress, Button } from '@material-ui/core';
import classNames from 'classnames';
import Router from 'next/router';
import useStyles from './style';

const CustomButton = ({
    rootClassName = '',
    className = {},
    variant = 'contained',
    color = 'primary',
    children,
    disabled = false,
    fullWidth = false,
    onClick = () => {},
    loading = false,
    customRootStyle = {},
    href = '',
    ...other
}) => {
    const styles = useStyles();
    const customClass = classNames(
        styles.container,
        fullWidth && styles.fullWidth,
        className,
    );
    const rootClass = classNames(
        styles.loadRoot,
        rootClassName,
    );
    return (
        <div className={rootClass} style={customRootStyle}>
            <div className={styles.wrapper}>
                <Button
                    onClick={
                        href !== '' && href ? () => Router.push(href) : onClick
                    }
                    variant={variant}
                    color={color}
                    className={customClass}
                    disabled={disabled || loading}
                    {...other}
                >
                    {children}
                </Button>
                {loading && (
                    <CircularProgress
                        size={24}
                        className={styles.buttonProgress}
                    />
                )}
            </div>
        </div>
    );
};

export default CustomButton;
