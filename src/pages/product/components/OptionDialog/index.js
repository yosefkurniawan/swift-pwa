import { Dialog, Fade } from "@material-ui/core";
import React from "react";
import useStyles from "./style";
import Typography from "@components/Typography";
import Button from "@components/Button";
import CustomRadio from "@components/Forms/Radio";
import SelectColor from "@components/Forms/SelectColor";
import SelectSize from "@components/Forms/SelectSize";
import Router from "next/router";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

const colorData = [
  { value: "#717171", label: "One" },
  { value: "#9b9b9b", label: " two" },
  { value: "#c1c1c1", label: " three" }
];

const sizeData = [
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "xxl", label: "XXL" }
];

const OptionDialog = props => {
  const { open, setOpen, t } = props;
  const styles = useStyles();
  const [color, setColor] = React.useState(colorData[0].value);
  const [size, setSize] = React.useState(sizeData[0].value);
  const [sizeOptions, setSizeOptions] = React.useState(sizeData);
  const [banner, setBanner] = React.useState('/assets/img/sample/product.png')

  const handleChangeColor = val => {
    if (val === "#c1c1c1") {
      setSizeOptions([]);
    }else{
      setSizeOptions(sizeData)
    }
    setColor(val);
  };

  const bannerStyles = {
    backgroundImage: `url(${banner})`
  }

  return (
      <Dialog
          fullScreen
          open={open}
          TransitionComponent={Transition}
          onClose={setOpen}
      >
          <div className={styles.root}>
              <div className={styles.bannerContainer} style={bannerStyles} onClick={() => setOpen()}>
              </div>
              <div className={styles.optionContainer}>
                  <CustomRadio
                      label="Select color"
                      flex="row"
                      CustomItem={SelectColor}
                      value={color}
                      valueData={colorData}
                      onChange={handleChangeColor}
                      className={styles.label}
                      classContainer={styles.center}
                  />
                  {sizeOptions === "" ||
                  sizeOptions.length <= 0 ||
                  !sizeOptions ? (
                      <>
                          <Typography
                              variant="label"
                              type="bold"
                              letter="uppercase"
                          >
                              Select Size
                          </Typography>
                          <Typography variant="p" className={styles.error}>
                              Sorry! This item is out of stock.
                          </Typography>
                      </>
                  ) : (
                      <>
                          <CustomRadio
                              label="Select size"
                              flex="row"
                              CustomItem={SelectSize}
                              value={size}
                              valueData={sizeOptions}
                              onChange={setSize}
                              className={styles.sizeContainer}
                              classContainer={styles.center}
                          />
                          <Button variant="text">
                              <Typography
                                  variant="p"
                                  letter="capitalize"
                                  decoration="underline"
                              >
                                  {t("product:viewGuide")}
                              </Typography>
                          </Button>
                      </>
                  )}

                  <div className={styles.footer}>
                      <Button
                          className={styles.btnAddToCard}
                          color="primary"
                          onClick={() => {
                              Router.push("/cart");
                          }}
                      >
                          <Typography
                              align="center"
                              type="reguler"
                              letter="capitalize"
                              className={styles.textBtnAddToCard}
                          >
                              {t("product:addToCart")}
                          </Typography>
                      </Button>
                  </div>
              </div>
          </div>
      </Dialog>
  );
};

export default OptionDialog;
