import classNames from "classnames";

import { makeStyles } from "@material-ui/core";

const useStyles =  makeStyles(theme => ({
    root : {
        borderRadius : 100,
    }
}))

const ListColor = ({
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

export default ListColor;

