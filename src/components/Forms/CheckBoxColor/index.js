import classNames from "classnames";
import useStyles from "./style";

const ChecboxColor = ({
  label = "",
  name = "",
  value = "",
  dataValues = [],
  onChange = () => {}
}) => {
  const styles = useStyles();
  const findVal = dataValues.find(element => element.value === value);
  const checked =
    (findVal !== "" && findVal !== undefined && findVal) ? true : false;

  const handleChange = () => {
    let newValue = dataValues;
    if (checked === true) {
      newValue = newValue.filter(element => element.value !== value);
    } else {
      newValue = [...newValue, { label, value }];
    }
    onChange(newValue);
  };

  const containerStyle = checked
    ? classNames(styles.container, styles.active)
    : styles.container;
  const customStyle = {
    backgroundColor: `${value || "#fff"}`
  };
  
  return (
    <div
      className={containerStyle}
      onClick={handleChange}
      style={customStyle}
    ></div>
  );
};

export default ChecboxColor;
