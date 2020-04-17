import Button from "@components/Button";
import PasswordField from "@components/Forms/Password";
import TextField from "@components/Forms/TextField";
import Typography from "@components/Typography";
import { regexPhone } from "@helpers/regex";
import { Checkbox, FormControl, FormControlLabel } from "@material-ui/core/";
import { useFormik } from "formik";
import * as Yup from "yup";
import useStyles from "./style";
import Router from "next/router";

const Register = ({ t }) => {
  const styles = useStyles();
  const [phoneIsWa, setPhoneIsWa] = React.useState(false);

  const handleWa = async (event) => {
    if (phoneIsWa === false) {
      formik.setFieldValue("whatsappNumber", formik.values.phoneNumber);
    }
    setPhoneIsWa(!phoneIsWa);
  };

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("validate:email:wrong"))
      .required(t("validate:email:required")),
    firstName: Yup.string().required(t("validate:firstName:required")),
    lastName: Yup.string().required(t("validate:lastName:required")),
    confirmPassword: Yup.string().required(
      t("validate:confirmPassword:required")
    ),
    password: Yup.string().required(t("validate:password:required")),
    confirmPassword: Yup.string()
      .required(t("validate:confirmPassword:required"))
      .test("check-pass", t("validate:confirmPassword.wrong"), (input) => {
        return input !== formik.values.password ? false : true;
      }),
    phoneNumber: Yup.string()
      .required(t("validate:phoneNumber:required"))
      .matches(regexPhone, t("validate:phoneNumber:wrong")),
    whatsappNumber: Yup.string()
      .required(t("validate:whatsappNumber:required"))
      .matches(regexPhone, t("validate:whatsappNumber:wrong")),
    tos: Yup.boolean().oneOf([true], t("validate:tos:required")),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      whatsappNumber: "",
      tos: false,
      newslater: false,
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log(values);
      Router.push({
        pathname: "/customer/account/otp",
        query: { phoneNumber: values.phoneNumber },
      });
    },
  });

  return (
    <form className={styles.container} onSubmit={formik.handleSubmit}>
      <TextField
        label="First Name"
        name="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={
          formik.touched.firstName && formik.errors.firstName ? true : false
        }
        errorMessage={
          (formik.touched.firstName && formik.errors.firstName) || null
        }
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && formik.errors.lastName ? true : false}
        errorMessage={
          (formik.touched.lastName && formik.errors.lastName) || null
        }
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && formik.errors.email ? true : false}
        errorMessage={(formik.touched.email && formik.errors.email) || null}
      />
      <PasswordField
        label="Password"
        showVisible={true}
        showPasswordMeter={true}
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && formik.errors.password ? true : false}
        errorMessage={
          (formik.touched.password && formik.errors.password) || null
        }
      />
      <TextField
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        error={
          formik.touched.confirmPassword && formik.errors.confirmPassword
            ? true
            : false
        }
        errorMessage={
          (formik.touched.confirmPassword && formik.errors.confirmPassword) ||
          null
        }
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        error={
          formik.touched.phoneNumber && formik.errors.phoneNumber ? true : false
        }
        errorMessage={
          (formik.touched.phoneNumber && formik.errors.phoneNumber) || null
        }
        footer={
          <FormControlLabel
            onChange={handleWa}
            className={styles.checkWa}
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
      {!phoneIsWa && (
        <TextField
          label="Whatsapp Phone Number"
          name="whatsappNumber"
          value={formik.values.whatsappNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.whatsappNumber && formik.errors.whatsappNumber
              ? true
              : false
          }
          errorMessage={
            (formik.touched.whatsappNumber && formik.errors.whatsappNumber) ||
            null
          }
        />
      )}
      <div className={styles.footer}>
        <FormControl>
          <div className="row row-center">
            <Checkbox
              value={formik.values.tos}
              name="tos"
              color="primary"
              size="small"
              onChange={formik.handleChange}
              className={styles.checkTos}
            />
            <Typography
              variant="p"
              letter="capitalize"
              onClick={() => formik.setFieldValue("tos", !formik.values.tos)}
            >
              I accept The
            </Typography>
            <Button
              variant="text"
              onClick={() => console.log("tos")}
              className="clear-margin-padding"
            >
              <Typography
                variant="p"
                letter="capitalize"
                decoration="underline"
              >
                Terms of Use
              </Typography>
            </Button>
          </div>
          {formik.touched.tos && formik.errors.tos && (
            <Typography color="red" className="clear-margin-padding">
              {formik.errors.tos}
            </Typography>
          )}
        </FormControl>
        <FormControlLabel
          value={formik.values.newslater}
          onChange={formik.handleChange}
          name="newslater"
          control={<Checkbox name="newslater" color="primary" size="small" />}
          label={
            <Typography variant="p" letter="capitalize" className="row center">
              Sign up for Newsletter
            </Typography>
          }
        />
        <Button fullWidth={true} className={styles.btnSigin} type="submit">
          <Typography variant="title" type="regular" letter="capitalize">
            {t("customer:register:button")}
          </Typography>
        </Button>
      </div>
    </form>
  );
};

export default Register;
