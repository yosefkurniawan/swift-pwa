import React from "react";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import useStyles from "./style";
import Typography from "../../Typography";

// Inspired by blueprintjs
function Component({
  valueData = [],
  onChange = () => {},
  value = "",
  name = "radio",
  ariaLabel = "radio",
  label = ""
}) {
  const styles = useStyles();
  const [input, setInput] = React.useState(value);

  const handleChange = event => {
    setInput(event.target.value);
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
        value={input}
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

export default Component;
