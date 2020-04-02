import classNames from "classnames";
import useStyles from "./style";

const SelectColor = ({ value, selected, onChange }) => {
  const styles = useStyles();
  const containerStyle = selected
    ? classNames(styles.container, styles.bordered)
    : styles.container;
  const customStyle = {
    backgroundColor: value
  };
  const handleChange = () => {
    onChange(value);
  };
  return (
    <div
      className={containerStyle}
      style={customStyle}
      onClick={handleChange}
    ></div>
  );
};

export default SelectColor;
