import { AppBar, Dialog, IconButton, Slide } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import React from "react";
import RadioGroup from "../../../../commons/Forms/Radio";
import Typography from "../../../../commons/Typography";
import useStyles from "./style";

const radioData = [
  { value : 'popularity', label : 'Popularity' },
  { value : 'new', label : 'New Item' },
  { value : 'priceHigh', label : 'price (Hight to Low)' },
  { value : 'priceLow', label : 'Price (Low to Hight)' },
]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Component = ({ open, setOpen }) => {
  const styles = useStyles();
  const [value, setValue] = React.useState("");
  const [short, setShort] = React.useState("female");

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
        <div className={styles.shotContainer}>
          <RadioGroup valueData={radioData} value={short} onChange={setShort} />
        </div>
      </div>
    </Dialog>
  );
};

export default Component;
