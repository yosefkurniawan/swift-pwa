import React, { useState } from "react";
import useStyles from "./style";
import { TextField } from "@material-ui/core";
import classNames from "classnames";

const CustomTextField = ({
  placeholder = "",
  disabled = false,
  onChange = () => {},
  value = "",
  className = {},
  label="",
  ...other
}) => {
  const styles = useStyles();
  const [localValue, setValue] = useState(value);
  const onChangeText = event => {
    const { value } = event.target;
    setValue(value);
    onChange(value);
  };
  const customClass = classNames(styles.container, className);
  return (
    <TextField
      placeholder={placeholder}
      disabled={disabled}
      value={localValue}
      onChange={onChangeText}
      className={customClass}
      label={label}
      {...other}
    />
  );
};

export default CustomTextField;
