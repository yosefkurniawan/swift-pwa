import { FormControl, Input, InputLabel } from '@material-ui/core';
import classNames from 'classnames';
import Typography from '@components/Typography';
import useStyles from './style';

const CustomTextField = ({
    placeholder = '',
    disabled = false,
    onChange = () => {},
    value = '',
    className = '',
    label = '',
    fullWidth = true,
    shrink = true,
    error = false,
    errorMessage = '',
    variant = 'standard',
    footer,
    ...other
}) => {
    const styles = useStyles();
    const customClass = classNames(styles.container, className);
    return (
        <FormControl
            disabled={disabled}
            fullWidth={fullWidth}
            error={error}
            variant={variant}
            className={customClass}
        >
            <InputLabel
                shrink={shrink}
                htmlFor={label}
                className={styles.label}
            >
                {label}
            </InputLabel>
            <Input
                id={label}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...other}
            />
            {React.isValidElement(footer) ? (
                footer
            ) : (
                <Typography variant="p" color={error ? 'red' : 'default'}>
                    {errorMessage}
                </Typography>
            )}
        </FormControl>
    );
};

export default CustomTextField;
