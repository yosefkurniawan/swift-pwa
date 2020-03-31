import useStyles from "./style";
import classNames from "classnames";

const Component = ({
  onClick = () => {},
  color = "#000",
  size = 20,
  className = {}
}) => {
  const classes = useStyles();
  const styles = {
    width: size,
    height: size,
    backgroundColor: color
  };

  const customClass = classNames(classes.root, className);

  return <span className={customClass} style={styles} onClick={onClick}></span>;
};

export default Component;
