import useStyles from "./style";
import Typograpy from "@components/Typography";
import classNames from "classnames";

const SelectSize = ({
  selected,
  value = "",
  label = "",
  onChange = () => {}
}) => {
  const styles = useStyles();
  const handleChange = () => {
    onChange(value);
  };

  const containerStyle = selected
    ? classNames(styles.container, styles.active)
    : styles.container;
  const labelStyle = selected
    ? classNames(styles.label, styles.labelActive)
    : styles.label;

  return (
    <div className={containerStyle} onClick={handleChange}>
      <Typograpy className={labelStyle}>{label}</Typograpy>
    </div>
  );
};

export default SelectSize;
