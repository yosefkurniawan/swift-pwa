import React from "react";
import useStyles from "./style";
import { Dialog, Grow, AppBar, Toolbar, IconButton } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import Typography from "@components/Typography";
import TextField from "@components/Forms/TextField";
import classNames from "classnames";
import Link from "next/link";
import Router from "next/router";

const data = [
  {
    text: "Shisendo",
    value: 1,
  },
];
const category = [
  {
    text: "Shirt",
    value: 23,
    cat: "Top",
  },
  {
    text: "Shine",
    value: 13,
    cat: "Accesories",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} timeout={600} />;
});

const TextSearch = ({
  text = "",
  searchValue = "",
  value = 3,
  subText = "",
}) => {
  const styles = useStyles();
  const textArray = text.split("");
  const valueArray = searchValue.split("");
  return (
    <div className={styles.textSearch}>
      <div className={styles.textValue}>
        <Typography
          variant="span"
          type="bold"
          letter="capitalize"
          className={styles.rmMargin}
        >
          {valueArray.map((txt, key) => textArray[key])}
          <Typography
            variant="span"
            letter="lowercase"
            className={styles.rmMargin}
            type="regular"
          >
            {textArray.map((txt, idx) => idx >= valueArray.length && txt)}
          </Typography>
        </Typography>
        <Typography variant="p" type="regular" className={styles.rmMargin}>
          {subText}
        </Typography>
      </div>
      <Typography variant="p">{value}</Typography>
    </div>
  );
};

const SearchDialog = ({ open, setOpen }) => {
  const styles = useStyles();
  const [value, setValue] = React.useState("");
  const classBody =
    value === ""
      ? classNames(styles.body, styles.hide)
      : classNames(styles.body, styles.show);
  const handleSearch = (ev) => {
    if (ev.key === 'Enter') {
      Router.push("/search/[id]", "/search/" + value)
    }
  }
  return (
    <Dialog
      fullScreen
      open={open}
      TransitionComponent={Transition}
      onClose={setOpen}
    >
      <AppBar className={styles.appBar}>
        <Toolbar>
          <IconButton edge="start" onClick={setOpen} aria-label="close">
            <CloseIcon className={styles.iconClose} />
          </IconButton>
          <TextField
            placeholder="Search ..."
            value={value}
            onChange={setValue}
            onKeyPress={handleSearch}
          />
        </Toolbar>
      </AppBar>
      <div className={classBody}>
        <Typography
          variant="span"
          type="bold"
          letter="uppercase"
          className={styles.title}
        >
          Brand
        </Typography>
        <div className={styles.result}>
          {data.map((dt, idx) => (
            <a
              onClick={() => {
                Router.push(
                  "/product/[id]",
                  "/product/" + dt.text.toLowerCase()
                );
              }}
            >
              <TextSearch text={dt.text} searchValue={value} value={dt.value} />
            </a>
          ))}
        </div>
        <Typography
          variant="span"
          type="bold"
          letter="uppercase"
          className={styles.title}
        >
          Category
        </Typography>
        <div className={styles.result}>
          {category.map((dt, idx) => (
            <a
              onClick={() =>
                Router.push("/category/[id]", "/category/" + dt.cat.toLowerCase())
              }
            >
              <TextSearch
                text={dt.text}
                searchValue={value}
                value={dt.value}
                subText={`in ${dt.cat}`}
              />
            </a>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

export default SearchDialog;
