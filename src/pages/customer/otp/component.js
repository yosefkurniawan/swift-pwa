import Button from "@components/Button";
import Typography from "@components/Typography";
import useStyles from "./style";
import { Input } from "@material-ui/core";

const Otp = ({ t, length = 4 }) => {
  const styles = useStyles();
  const [otp, setOtp] = React.useState("");
  const [time, setTime] = React.useState(0);
  const [manySend, setManySend] = React.useState(1);

  const handleChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSend = () => {
    setManySend(manySend + 1);
    const countdown = manySend >= 3 ? 320 : manySend <= 1 ? 60 : manySend * 30;
    setTime(countdown);
  };

  React.useEffect(() => {
    if (!time) return;
    const intervalId = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <div className={styles.container}>
      <Typography variant="h1" type="bold" letter="capitalize" align="center">
        {t("customer:otp:pageTitle")}
      </Typography>
      <Typography variant="span" letter="capitalize" align="center">
        {t("customer:otp:label")}
      </Typography>
      <div className={styles.formOtp}>
        <Input
          value={otp}
          onChange={handleChange}
          inputProps={{ maxLength: length }}
          classes={{
            input: styles.inputField,
          }}
          className={styles.fieldOtp}
        />
      </div>
      <Button fullWidth={true} className={styles.btnSigin} href="/customer/account">
        <Typography variant="title" type="regular" letter="capitalize">
          {t("customer:otp:button")}
        </Typography>
      </Button>
      {time > 0 ? (
        <Typography variant="p">
          {t("customer:otp:wait")} {time}
        </Typography>
      ) : (
        <Button variant="text" onClick={handleSend}>
          <Typography variant="p">{t("customer:otp:sendOtp")}</Typography>
        </Button>
      )}
    </div>
  );
};

export default Otp;
