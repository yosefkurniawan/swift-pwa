/* eslint-disable no-nested-ternary */
import TextField from '@components/Forms/TextField';
import Typography from '@components/Typography';

import { InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import checkPassword from '@helpers/passwordStrength';
import classNames from 'classnames';
import useStyles from './style';

const PasswordField = ({
    label = 'Password',
    value = '',
    onChange = () => {},
    showPasswordMeter = false,
    showVisible = false,
    error = false,
    errorMessage = '',
    ...other
}) => {
    const styles = useStyles();
    const [show, setShow] = React.useState(false);
    const [errorPaswd, setErrorPasswd] = React.useState({
        status: 'No Password',
    });

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        onChange(event);
        if (showPasswordMeter) {
            const strength = checkPassword(event.target.value);
            setErrorPasswd(strength);
        }
    };
    return (
        <TextField
            label={label}
            type={show ? 'text' : 'password'}
            value={value}
            onChange={handleChange}
            error={error}
            errorMessage={errorMessage}
            footer={
                showPasswordMeter && (
                    <>
                        <div className={styles.passwordStrength}>
                            <Typography
                                variant="p"
                                type="semiBold"
                                className={styles.txtPasswdStr}
                            >
                                Password Strength:
                                {' '}
                                {errorPaswd.status}
                            </Typography>
                            <div
                                className={classNames(
                                    styles.passwdStrPrgsBar,
                                    errorPaswd.status.toLocaleLowerCase()
                                        === 'no password'
                                        ? styles.zeroBar
                                        : errorPaswd.status.toLocaleLowerCase()
                                          === 'weak'
                                            ? styles.per3Bar
                                            : errorPaswd.status.toLocaleLowerCase()
                                          === 'medium'
                                                ? styles.halfBar
                                                : errorPaswd.status.toLocaleLowerCase()
                                          === 'strong'
                                                    ? styles.per7
                                                    : styles.full,
                                )}
                            />
                            <div
                                className={classNames(
                                    styles.passwdStrPrgsCtr,
                                    errorPaswd.status.toLocaleLowerCase()
                                        === 'no password'
                                        ? styles.full
                                        : errorPaswd.status.toLocaleLowerCase()
                                          === 'weak'
                                            ? styles.per7
                                            : errorPaswd.status.toLocaleLowerCase()
                                          === 'medium'
                                                ? styles.half
                                                : errorPaswd.status.toLocaleLowerCase()
                                          === 'strong'
                                                    ? styles.per3
                                                    : styles.zero,
                                )}
                            />
                        </div>
                        <Typography variant="p" type="semiBold" color="red">
                            {errorPaswd.message || ''}
                        </Typography>
                    </>
                )
            }
            endAdornment={
                showVisible && (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShow(!show)}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {show ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                )
            }
            {...other}
        />
    );
};

export default PasswordField;
