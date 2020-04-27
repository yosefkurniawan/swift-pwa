import Button from '@components/Button';
import TextField from '@components/Forms/TextField';
import Password from '@components/Forms/Password';
import Typography from '@components/Typography';

import useStyles from './style';

const OtpBlock = ({ phoneProps = {}, codeProps = {} }) => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <div className={styles.componentContainer}>
                <TextField
                    label="Phone Number"
                    className={styles.input}
                    fullWidth
                    {...phoneProps}
                />
                <Button className={styles.button}>
                    <Typography variant="p" color="white" align="center">
                        Send Otp
                    </Typography>
                </Button>
            </div>
            <div className={styles.componentContainer}>
                <Password
                    label="Code Otp"
                    className={styles.input}
                    showVisible={false}
                    showPasswordMeter={false}
                    {...codeProps}
                />
                <Button className={styles.button}>
                    <Typography variant="p" color="white">
                        Verify
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

export default OtpBlock;
