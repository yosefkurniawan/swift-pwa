import useStyles from "./style";
import Button from "../../../../commons/Button";
import Typography from "../../../../commons/Typography";

const ButtonField = ({ placeholder = "", onClick }) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Button variant="text" capitalize={true} onClick={onClick}>
        <Typography
          variant="span"
          type="semiBold"
          className={styles.placeholder}
        >
          {placeholder}
        </Typography>
      </Button>
    </div>
  );
};

export default ButtonField;
