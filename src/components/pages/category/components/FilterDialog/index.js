import { AppBar, Dialog, IconButton, Slide } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import React from "react";
import RadioGroup from "../../../../commons/Forms/Radio";
import Typography from "../../../../commons/Typography";
import RangeSlider from "../../../../commons/Forms/RangeSlider";
import CheckBox from "../../../../commons/Forms/CheckBox";
import CheckBoxSize from "../../../../commons/Forms/CheckBoxSize"
import CheckBoxColor from "../../../../commons/Forms/CheckBoxColor"
import Button from "../../../../commons/Button";
import useStyles from "./style";
import classNames from 'classnames'

const radioData = [
  { value: "popularity", label: "Popularity" },
  { value: "new", label: "New Item" },
  { value: "priceHigh", label: "price (Hight to Low)" },
  { value: "priceLow", label: "Price (Low to Hight)" }
];

const checkBoxData = [
  { value: "one", label: "Brand One" },
  { value: "two", label: "brand two" },
  { value: "three", label: "Brand three" },
  { value: "four", label: "brand four" }
]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Component = ({ open, setOpen }) => {
  const styles = useStyles();
  const [value, setValue] = React.useState("");
  const [short, setShort] = React.useState("female");
  const [priceRange, setPriceRange] = React.useState([250000, 1000000]);
  const [size, setSize] = React.useState(["M", "XL"]);
  const [color, setColor] = React.useState(["#717171", "#9b9b9b"]);
  const [brand, setbrand] = React.useState([]);

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
            CustomItem={ CheckBoxSize }
          />
        </div>
        <div className={styles.fieldContainer}>
          <CheckBox
            label="color"
            data={["#717171", "#9b9b9b", "#c1c1c1", "#e5e5e5" ,"#ffffff"]}
            value={color}
            flex="row"
            CustomItem={ CheckBoxColor }
          />
        </div>
        <div className={classNames(styles.fieldContainer, styles.last)}>
          <CheckBox
            label="brand"
            data={checkBoxData}
            value={brand}
            flex="column"
          />
        </div>
      </div>

      <div className={styles.footer}>
        <Button variant="outlined" className={styles.btnSave}>
          Clear
        </Button>
        <Button className={styles.btnSave}>Save</Button>
      </div>
    </Dialog>
  );
};

export default Component;
