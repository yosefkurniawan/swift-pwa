import { sliderStyle, useStyles } from "./style";
import { Slider, withStyles } from "@material-ui/core";
import Typography from "../../Typography";
import PropTypes from "prop-types";
import currency from '../../../../helpers/currency'

const CustomSlider = withStyles(sliderStyle)(Slider);

const Component = ({
  maxValue = 100,
  onChange = () => {},
  value = [0, 10],
  label= "label"
}) => {
  const styles = useStyles();
  const [input, setInput] = React.useState(value);

  const handleChange = (event, newValue) => {
    setInput(newValue);
  };

  return (
    <div className={styles.container}>
      <Typography variant="label" type="bold" letter="uppercase">
        {label}
      </Typography>
      <div className={styles.spanLabelPrice}>
        <Typography variant="label" type="reguler" letter="uppercase">
        {
           currency({
             value : input[0],
             currency : 'IDR'
           })
         }
        </Typography>
        <Typography variant="label" type="reguler" letter="uppercase">
        {
           currency({
             value : input[1],
             currency : 'IDR'
           })
         }
        </Typography>
      </div>
      <CustomSlider
        value={input}
        onChange={handleChange}
        valueLabelDisplay="off"
        aria-labelledby="range-slider"
        max={maxValue}
      />
    </div>
  );
};

Component.propTypes = {
  max: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.array,
  label: PropTypes.string
};

export default Component;
