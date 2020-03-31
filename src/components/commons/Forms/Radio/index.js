import React from "react";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import useStyles from "./style";
import Typography from "../../Typography";

// Inspired by blueprintjs
function CustomRadio({
  valueData = [],
  onChange = () => {},
  value = "",
  name = "radio",
  ariaLabel = "radio",
  label = ""
}) {
  const styles = useStyles();

  const handleChange = event => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.continer}>
      <Typography variant="label" type="bold" letter="uppercase">
        {label}
      </Typography>
      <RadioGroup
        aria-label={ariaLabel}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {valueData.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.value || ""}
            control={<Radio color="default" size="small" />}
            label={item.label || ""}
            className={styles.radioContainer}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

export default CustomRadio;
