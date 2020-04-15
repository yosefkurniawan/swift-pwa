import useStyles from "./style";
import Typography from "@components/Typography";
import Button from "@components/Button";
import TextField from "@components/Forms/TextField";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const ForgotPassword = ({ t }) => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className={styles.container}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={t("customer:forgotPassword:success")}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Typography variant="span" align="left">
        {t("customer:forgotPassword:content")}
      </Typography>
      <TextField label="Email" className={styles.email} />
      <Button
        className={styles.btn}
        fullWidth={true}
        onClick={() => setOpen(!open)}
      >
        {t("common:button:send")}
      </Button>
    </div>
  );
};

export default ForgotPassword;
