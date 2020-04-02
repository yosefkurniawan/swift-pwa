import { AppBar, Dialog, IconButton, Slide } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import React from "react";
import RadioGroup from "@components/Forms/Radio";
import Typography from "@components/Typography";
import RangeSlider from "@components/Forms/RangeSlider";
import CheckBox from "@components/Forms/CheckBox";
import CheckBoxSize from "@components/Forms/CheckBoxSize";
import CheckBoxColor from "@components/Forms/CheckBoxColor";
import Button from "@components/Button";
import useStyles from "./style";
import classNames from "classnames";

const radioData = [
  { value: "popularity", label: "Popularity" },
  { value: "new", label: "New Item" },
  { value: "priceHigh", label: "price (Hight to Low)" },
  { value: "priceLow", label: "Price (Low to Hight)" }
];

const brandData = [
  { value: "one", label: "Brand One" },
  { value: "two", label: "brand two" },
  { value: "three", label: "Brand three" },
  { value: "four", label: "brand four" }
];

const colorData = [
  { value: "#717171", label: "One" },
  { value: "#9b9b9b", label: " two" },
  { value: "#c1c1c1", label: " three" },
  { value: "#e5e5e5", label: " four" },
  { value: "#ffffff", label: " four" }
];

const sizeData = [
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "xxl", label: "XXL" }
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FilterDialog = ({ open, setOpen }) => {
  const styles = useStyles();
  const [value, setValue] = React.useState("");
  const [short, setShort] = React.useState("female");
  const [priceRange, setPriceRange] = React.useState([250000, 1000000]);
  const [size, setSize] = React.useState(["M", "XL"]);
  const [color, setColor] = React.useState(["#717171", "#9b9b9b"]);
  const [brand, setbrand] = React.useState([
    { value: "four", label: "brand four" }
  ]);

  const handleClear = () => {
    setShort("");
    setPriceRange([0, 0]);
    setSize([]);
    setColor([]);
    setbrand([]);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      TransitionComponent={Transition}
      onClose={setOpen}
    >
      <AppBar className={styles.appBar}>
        <IconButton
          className={styles.btnClose}
          edge="start"
          onClick={setOpen}
          aria-label="close"
        >
          <CloseIcon className={styles.iconClose} />
        </IconButton>
        <Typography
          variant="span"
          type="bold"
          align="center"
          letter="uppercase"
          className={styles.title}
        >
          Filter & Short{" "}
        </Typography>
      </AppBar>
      <div className={styles.body}>
        <div className={styles.fieldContainer}>
          <RadioGroup
            label="Sort By"
            valueData={radioData}
            value={short}
            onChange={setShort}
          />
        </div>
        <div className={styles.fieldContainer}>
          <RangeSlider
            label="Price Range"
            maxValue={1500000}
            value={priceRange}
            onChange={setPriceRange}
          />
        </div>
        <div className={styles.fieldContainer}>
          <CheckBox
            label="Size"
            data={["S", "M", "L", "XL", "XXL"]}
            value={size}
            flex="row"
            CustomItem={CheckBoxSize}
            onChange={setSize}
          />
        </div>
        <div className={styles.fieldContainer}>
          <CheckBox
            label="color"
            data={["#717171", "#9b9b9b", "#c1c1c1", "#e5e5e5", "#ffffff"]}
            value={color}
            flex="row"
            CustomItem={CheckBoxColor}
            onChange={setColor}
          />
        </div>
        <div className={classNames(styles.fieldContainer, styles.last)}>
          <CheckBox
            label="brand"
            data={brandData}
            value={brand}
            flex="column"
            onChange={setbrand}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <Button
          variant="outlined"
          className={styles.btnSave}
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button className={styles.btnSave} onClick={setOpen}>
          Save
        </Button>
      </div>
    </Dialog>
  );
};

export default FilterDialog;
