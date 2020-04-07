import Typography from "@components/Typography";
import { Radio } from "@material-ui/core";
import classNames from "classnames";
import useStyles from "./style";

const RadioDeliveryItem = (props) => {
  const styles = useStyles();
  const { value, label, className, selected, onChange } = props;
  const handleChange = () => {
    onChange(value);
  };
  const labelType = selected ? 'bold' : 'regular' 
  return (
    <div className={styles.root} onClick={handleChange}>
      <Radio color="default" size="small" checked={selected} />
      <div className={styles.labelContainer}>
        <Typography variant="p" type={labelType}>{label}</Typography>
        <Typography variant="p" type={labelType}>{value.price}</Typography>
      </div>
    </div>
  );
};

export default RadioDeliveryItem;
