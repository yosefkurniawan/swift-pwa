import useStyles from "./style";
import Typography from "../../Typography";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import classNames from "classnames";

const CheckDefault = ({ label = "", name = "", active = false }) => {
  const [checked, setChecked] = React.useState(active);
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          name={name}
          color="primary"
          size="small"
        />
      }
      label={label}
    />
  );
};

const Component = ({
  label = "label",
  data = [],
  value = [],
  flex = "row",
  CustomItem
}) => {
  const styles = useStyles();
  const checkStyle = classNames(styles[flex], styles.checkboxContainer);
  return (
    <div className={styles.container}>
      <Typography variant="label" type="bold" letter="uppercase">
        {label}
      </Typography>
      <div className={checkStyle}>
        {data.map((item, index) =>
          value.indexOf(item) > -1 ? (
            CustomItem ? (
              <CustomItem
                label={item.label ? item.label : item}
                value={item.value ? item.value : item}
                active={true}
                key={index}
              />
            ) : (
              <CheckDefault
                active={true}
                label={item.label ? item.label : item}
                value={item.value ? item.value : item}
                key={index}
              />
            )
          ) : CustomItem ? (
            <CustomItem
              label={item.label ? item.label : item}
              value={item.value ? item.value : item}
              key={index}
            />
          ) : (
            <CheckDefault
              label={item.label ? item.label : item}
              value={item.value ? item.value : item}
              key={index}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Component;
