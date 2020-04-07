import classNames from "classnames";
import Typography from "@components/Typography";
import { GRAY_SECONDARY } from '@theme/colors'
import { Centering, CreateBorder } from '@theme/mixins'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 100,
    ...CreateBorder('1px','1px','1px','1px',GRAY_SECONDARY),
    ...Centering
  },
  label : {
      fontSize : 8 
  }
}));

const ListSize = ({
  onClick = () => {},
  data = "m",
  width = 20,
  className = {},
}) => {
  const classes = useStyles();
  const styles = {
    width: width,
    height: width,
  };

  const customClass = classNames(classes.root, className);

  return (
    <span className={customClass} style={styles} onClick={onClick}>
      <Typography variant="label" letter="uppercase" className={classes.label}>
        {data}
      </Typography>
    </span>
  );
};

export default ListSize;
