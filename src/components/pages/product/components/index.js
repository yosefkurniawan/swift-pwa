import { Box, IconButton, Badge } from "@material-ui/core";
import React from "react";
import Header from "../../../commons/Header";
import Banner from "../../../commons/slider/Banner";
import useStyles from "../style";
import { LocalMall } from "@material-ui/icons";
import Button from "../../../commons/Button";
import Typography from "../../../commons/Typography";
import RightDrawer from './RightDrawer'

const data = [
  {
    img: "/assets/img/noun_Image.svg",
    link: "#"
  },
  {
    img: "/assets/img/noun_Image.svg",
    link: "#"
  }
];

const ShoppingBagIcon = ({ data = 0 }) => {
  return (
    <IconButton>
      <Badge badgeContent={data}>
        <LocalMall />
      </Badge>
    </IconButton>
  );
};

const ProductPage = ({ t, i18n }) => {
  const styles = useStyles();
  const [value, setValue] = React.useState(0);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box className={styles.container}>
        <div className={styles.headContainer}>
          <Banner data={data} height="70vh" />
          <Header
            className={styles.header}
            RightComponent={<ShoppingBagIcon />}
          />
          <RightDrawer open={openDrawer} setOpen={() => setOpenDrawer(!openDrawer)} />
        </div>
        <div className={styles.body}>

        </div>
        <div className={styles.footer}>
          <Button className={styles.btnAddToCard} color="primary">
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
      </Box>
    </>
  );
};

export default ProductPage;
