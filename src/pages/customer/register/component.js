import Button from "@components/Button";
import TextField from "@components/Forms/TextField";
import Typography from "@components/Typography";
import { Checkbox, FormControlLabel } from "@material-ui/core/";
import useStyles from "./style";

const LabelTos = () => {
  return (
    <div className="row center">
      <Typography variant="p" letter="capitalize" className="row center">
        I accept The
      </Typography>
      <Button variant="text" href="/" className="clear-margin-padding ">
        <Typography variant="p" letter="capitalize" decoration="underline">
          Terms of Use
        </Typography>
      </Button>
    </div>
  );
};

const Register = ({ t }) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <TextField label="First Name" />
      <TextField label="Last Name" />
      <TextField label="Email" type="email" />
      <TextField
        label="Password"
        type="password"
        footer={
          <div className={styles.passwordStrength}>
            <Typography variant="p">Password Strength: No Password</Typography>
          </div>
        }
      />
      <TextField label="Confirm Password" type="password" />
      <TextField
        label="Phone Number"
        footer={
          <FormControlLabel
            control={
              <Checkbox name="whastapptrue" color="primary" size="small" />
            }
            label={
              <Typography variant="p">
                Phone Number is Registered in Whatsapp
              </Typography>
            }
          />
        }
      />
      <div className={styles.footer}>
        <FormControlLabel
          control={<Checkbox name="termservice" color="primary" size="small" />}
          label={<LabelTos />}
        />
        <FormControlLabel
          control={<Checkbox name="newslater" color="primary" size="small" />}
          label={
            <Typography variant="p" letter="capitalize" className="row center">
              Sign up for Newsletter
            </Typography>
          }
        />
        <Button fullWidth={true} className={styles.btnSigin} href="/customer/account/otp">
          <Typography variant="title" type="regular" letter="capitalize">
            {t("customer:register:button")}
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default Register;
