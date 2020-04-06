import { sliderStyle, useStyles } from "./style";
import { Slider, withStyles } from "@material-ui/core";
import Typography from "@components/Typography";
import PropTypes from "prop-types";
import currency from '@helpers/currency'

const CustomSlider = withStyles(sliderStyle)(Slider);

const RangeSlider = ({
  maxValue = 100,
  onChange = () => {},
  value = [0, 10],
  label= "label"
}) => {
  const styles = useStyles();

  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <div className={styles.container}>
      <Typography variant="label" type="bold" letter="uppercase">
        {label}
      </Typography>
      <div className={styles.spanLabelPrice}>
        <Typography variant="label" type="regular" letter="uppercase">
        {
           currency({
             value : value[0],
             currency : 'IDR'
           })
         }
        </Typography>
        <Typography variant="label" type="regular" letter="uppercase">
        {
           currency({
             value : value[1],
             currency : 'IDR'
           })
         }
        </Typography>
      </div>
      <CustomSlider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        aria-labelledby="range-slider"
        max={maxValue}
      />
    </div>
  );
};

RangeSlider.propTypes = {
  max: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.array,
  label: PropTypes.string
};

export default RangeSlider;
