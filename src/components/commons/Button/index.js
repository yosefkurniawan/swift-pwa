import Image from "material-ui-image";
import classNames from "classnames";
import useStyles from "./style";
import Button from "@material-ui/core/Button";

const Component = ({
  className = {},
  variant = "contained",
  color = "primary",
  children,
  onClick = () => {}
}) => {
  const styles = useStyles();
  const customClass = classNames(styles.button, className);
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      className={customClass}
    >
      {children}
    </Button>
  );
};

export default Component;
