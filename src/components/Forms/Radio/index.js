import React from "react";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import useStyles from "./style";
import Typography from "@components/Typography";
import classNames from "classnames";

const RadioItem = props => {
  const styles = useStyles();
  const { value, label } = props;
  return (
    <FormControlLabel
      value={value || ""}
      control={<Radio color="default" size="small" />}
      label={label || ""}
      className={styles.radioContainer}
    />
  );
};

// Inspired by blueprintjs
function CustomRadio({
  valueData = [],
  onChange = () => {},
  value = "",
  name = "radio",
  ariaLabel = "radio",
  label = "",
  CustomItem,
  className = {},
  classContainer = {},
  flex = "column"
}) {
  const styles = useStyles();

  const rootStyle = classNames(styles.root, className);
  const containerStyle = classNames(styles[flex], classContainer);

  const handleChange = event => {
    onChange(event.target.value);
  };

  const handleChangeCustom = val => {
    onChange(val)
  }

  return (
    <div className={rootStyle}>
      <Typography variant="label" type="bold" letter="uppercase">
        {label}
      </Typography>
      <RadioGroup
        aria-label={ariaLabel}
        name={name}
        value={value}
        onChange={handleChange}
        className={containerStyle}
      >
         {valueData.map((item, index) =>
          CustomItem ? (
            <CustomItem
              key={index}
              {...item}
              selected={value === item.value ? true : false}
              onChange={handleChangeCustom}
            />
          ) : (
            <RadioItem key={index} {...item} />
          )
        )}
      </RadioGroup>
    </div>
  );
}

export default CustomRadio;
