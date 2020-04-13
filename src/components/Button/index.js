import Image from "material-ui-image";
import classNames from "classnames";
import useStyles from "./style";
import Button from "@material-ui/core/Button";
import Link from 'next/link'

const CustomButton = ({
  className = {},
  variant = "contained",
  color = "primary",
  children,
  disabled = false,
  fullWidth = false,
  onClick = () => {},
  ...other
}) => {
  const styles = useStyles();
  const customClass = classNames(
    styles.container, 
    fullWidth && styles.fullWidth,
    className
  );
  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      className={customClass}
      disabled={disabled}
      {...other}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
