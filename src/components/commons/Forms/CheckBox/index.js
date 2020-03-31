import useStyles from "./style";
import Typography from "../../Typography";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import classNames from "classnames";

const CheckDefault = ({
  label = "",
  name = "",
  value = "",
  dataValues = [],
  onChange = () => {}
}) => {
  const findVal = dataValues.find(element => element.value === value);
  const checked =
    findVal !== "" && findVal !== undefined && findVal ? true : false;

  const handleChange = () => {
    let newValue = dataValues;
    if (checked === true) {
      newValue = newValue.filter(element => element.value !== value);
    } else {
      newValue = [...newValue, { label, value }];
    }
    onChange(newValue);
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

const CustomCheckbox = ({
  label = "label",
  data = [],
  value = [],
  flex = "row",
  CustomItem,
  onChange = () => {}
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
          CustomItem ? (
            <CustomItem
              label={item.label ? item.label : item}
              value={item.value ? item.value : item}
              dataValues={value}
              key={index}
              onChange={onChange}
            />
          ) : (
            <CheckDefault
              label={item.label ? item.label : item}
              value={item.value ? item.value : item}
              dataValues={value}
              key={index}
              onChange={onChange}
            />
          )
        )}
      </div>
    </div>
  );
};

export default CustomCheckbox;
