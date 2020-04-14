import useStyles from "./style";
import TextField from "@components/Forms/TextField";
import Button from "@components/Button";
import Typography from "@components/Typography";

const Login = ({ t }) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <TextField label="Email/Phone Number" placeholder="+6281234xxxx" />
      <TextField label="Password" placeholder="*******" type="password" />
      <Button
        fullWidth={true}
        className={styles.btnSigin}
        href="/customer/account"
      >
        <Typography variant="title" type="regular" letter="capitalize">
          {t("customer:login:pageTitle")}
        </Typography>
      </Button>
      <Button variant="text" href="/customer/account/forgot-password">
        <Typography
          variant="p"
          type="regular"
          letter="capitalize"
          decoration="underline"
        >
          {t("customer:login:forgotPassword")}
        </Typography>
      </Button>
      <div className={styles.footer}>
        <Typography variant="span" letter="capitalize" align="center">
          {t("customer:login:notHaveAccount")}
        </Typography>
        <Button
          fullWidth={true}
          className={styles.btnSigin}
          variant="outlined"
          href="/customer/account/create"
        >
          <Typography variant="title" type="regular" letter="capitalize">
            {t("customer:register:title")}
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default Login;
