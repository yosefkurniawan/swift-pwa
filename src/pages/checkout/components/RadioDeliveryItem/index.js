import Typography from "@components/Typography";
import { Radio } from "@material-ui/core";
import useStyles from "./style";

const RadioDeliveryItem = (props) => {
  const styles = useStyles();
  const {
    value,
    label,
    className,
    selected,
    onChange,
    RightComponent,
    borderBottom = true,
  } = props;
  const handleChange = () => {
    onChange(value);
  };
  const labelType = selected ? "bold" : "regular";
  const rootStyle = borderBottom ? styles.root : styles.rootRmBorder
  return (
    <div className={rootStyle} onClick={handleChange}>
      <Radio color="default" size="small" checked={selected} />
      <div className={styles.labelContainer}>
        <Typography variant="p" type={labelType}>
          {label}
        </Typography>
        {React.isValidElement(RightComponent) ? (
          RightComponent
        ) : (
          <Typography variant="p" type={labelType}>
            {value.price}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default RadioDeliveryItem;
