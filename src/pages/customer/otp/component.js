import Button from '@components/Button';
import Typography from '@components/Typography';
import { Input, Paper } from '@material-ui/core';
import { MailOutline } from '@material-ui/icons';
import { useRouter } from 'next/router';
import useStyles from './style';

const Otp = ({ t, length = 4 }) => {
    const router = useRouter();
    const phone = router.query.phoneNumber;
    const styles = useStyles();
    const [otp, setOtp] = React.useState('');
    const [time, setTime] = React.useState(0);
    const [manySend, setManySend] = React.useState(1);

    const handleChange = (event) => {
        setOtp(event.target.value);
    };

    const handleSend = () => {
        if (time <= 0) {
            setManySend(manySend + 1);
            // eslint-disable-next-line no-nested-ternary
            const countdown = manySend >= 3 ? 320 : manySend <= 1 ? 60 : manySend * 30;
            setTime(countdown);
        }
    };

    React.useEffect(() => {
        if (!time) return;
        const intervalId = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        // eslint-disable-next-line consistent-return
        return () => clearInterval(intervalId);
    }, [time]);

    const handleOtp = () => {
        router.push('/customer/account');
    };

    return (
        <div className={styles.container}>
            <Typography
                variant="h1"
                type="bold"
                letter="capitalize"
                align="center"
            >
                {t('customer:otp:pageTitle')}
            </Typography>
            <Typography variant="p" letter="capitalize" align="center">
                {t('customer:otp:choseMethod')}
            </Typography>
            <Paper
                variant="outlined"
                className={styles.methodContainer}
                onClick={handleSend}
            >
                <div className="row">
                    <MailOutline />
                    {' '}
                    <Typography
                        variant="span"
                        letter="capitalize"
                        align="center"
                    >
                        {t('customer:otp:sms')}
                        {' '}
                        {phone}
                    </Typography>
                </div>
            </Paper>
            <Typography variant="p" letter="capitalize" align="center">
                {t('customer:otp:note')}
            </Typography>
            <Typography variant="span" letter="capitalize" align="center">
                {t('customer:otp:label')}
            </Typography>
            <div className={styles.formOtp}>
                <Input
                    value={otp}
                    onChange={handleChange}
                    inputProps={{ max: length, maxLength: length }}
                    classes={{
                        input: styles.inputField,
                    }}
                    className={styles.fieldOtp}
                    type="number"
                />
            </div>
            <Button
                fullWidth
                className={styles.btnSigin}
                onClick={handleOtp}
                disabled={otp === '' || !otp || otp.length < 4}
            >
                <Typography variant="title" type="regular" letter="capitalize">
                    {t('customer:otp:button')}
                </Typography>
            </Button>
            {time > 0 && (
                <Typography variant="p" align="center">
                    {t('customer:otp:wait')}
                    {' '}
                    {time}
                    {' '}
                    {t('customer:otp:resend')}
                </Typography>
            )}
            <Typography variant="p">
                {t('customer:otp:sendTimes')}
                {' '}
                {manySend - 1}
                {' '}
                {t('customer:otp:time')}
            </Typography>
        </div>
    );
};

export default Otp;
