import useStyles from "./style";
import Button from "@components/Button";
import Typography from "@components/Typography";
import TextField from "@components/Forms/TextField";
import Password from "@components/Forms/Password";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import classNames from "classnames";
import Router from "next/router";

const ProfilePage = ({ t }) => {
  const styles = useStyles();

  const [edit, setEdit] = React.useState(false);
  const [editPass, setEditPass] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(false);

  const handleSave = () => {
    setEdit(false);
    setEditPass(false);
    setEditEmail(false);
  };

  return (
    <div className={styles.container}>
      <TextField label="first name" value="Diasty" disabled={!edit} />
      <TextField label="last name" value="Hardikaputri" disabled={!edit} />
      <TextField
        label="email"
        value="hardhikaputri@gmail.com"
        disabled={!editEmail}
      />

      <div className={classNames(styles.editContainer, edit ? "show" : "hide")}>
        <div className={editPass ? "show" : "hide"}>
          <Password label="Current Password" showVisible={true} />
          <Password
            label="New Password"
            showVisible={true}
            showPasswordMeter={true}
          />
          <Password label="Confirm Password" />
        </div>
        <FormControlLabel
          onChange={() => setEditPass(!editPass)}
          control={
            <Checkbox name="whastapptrue" color="primary" size="medium" />
          }
          label={
            <Typography variant="span">
              {t("common:button:change")} Password
            </Typography>
          }
        />
        <FormControlLabel
          onChange={() => setEditEmail(!editEmail)}
          control={
            <Checkbox name="whastapptrue" color="primary" size="medium" />
          }
          label={
            <Typography variant="span">
              {t("common:button:change")} Email
            </Typography>
          }
        />
      </div>

      <div>
        <Button
          variant="outlined"
          className={edit ? "hide" : "show"}
          onClick={() => setEdit(!edit)}
        >
          {t("common:button:change")}
        </Button>
        <Button
          variant="outlined"
          className={edit ? "show" : "hide"}
          onClick={handleSave}
        >
          {t("common:button:save")}
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
