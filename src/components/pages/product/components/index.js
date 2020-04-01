import { Box, IconButton, Badge } from "@material-ui/core";
import React from "react";
import Header from "../../../commons/Header";
import Banner from "../../../commons/slider/Banner";
import useStyles from "../style";
import {
  LocalMall,
  FavoriteBorderOutlined,
  ShareOutlined
} from "@material-ui/icons";
import Button from "../../../commons/Button";
import Typography from "../../../commons/Typography";
import RightDrawer from "./RightDrawer";
import currency from "../../../../helpers/currency";
import Caraousel from "../../../commons/slider/Carousel";
import RatingStar from "./RatingStar";
import CustomerReview from "./CustomerReview";
import ExpandDetail from './ExpandDetail'

const data = [
  {
    img: "/assets/img/noun_Image.svg",
    link: "#"
  },
  {
    img: "/assets/img/noun_Image.svg",
    link: "#"
  },
  {
    img: "/assets/img/noun_Image.svg",
    link: "#"
  }
];

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`;

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
          {/* <Header
            className={styles.header}
            RightComponent={<ShoppingBagIcon />}
          /> */}
          <RightDrawer
            open={openDrawer}
            setOpen={() => setOpenDrawer(!openDrawer)}
          />
        </div>
        <div className={styles.body}>
          <div className={styles.titleContainer}>
            <div className={styles.titlePriceContainer}>
              <Typography
                variant="title"
                type="bold"
                letter="capitalize"
                className="clear-margin-padding"
              >
                Product Name
              </Typography>
              <Typography
                type="reguler"
                variant="span"
                letter="uppercase"
                className="clear-margin-padding"
              >
                {currency({
                  currency: "idr",
                  value: 900000
                })}
              </Typography>
            </div>
            <div className={styles.shareContainer}>
              <IconButton className={styles.btnShare}>
                <FavoriteBorderOutlined className={styles.iconShare} />
              </IconButton>
              <IconButton className={styles.btnShare}>
                <ShareOutlined className={styles.iconShare} />
              </IconButton>
            </div>
          </div>
          <div className={styles.titleContainer}>
            <div className={styles.ratingContainer}>
              <RatingStar value={3} />
              <Typography variant="p" type="reguler" letter="capitalize">
                5 {t("product:review")}
              </Typography>
            </div>
            <Typography variant="p" type="reguler" letter="lowercase">
              3 {t("product:colorOption")}
            </Typography>
          </div>
          <div className={styles.desc}>
            <Typography
              align="center"
              variant="p"
              type="reguler"
              letter="default"
            >
              {lorem}
            </Typography>
          </div>
          <div>
            <ExpandDetail />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.titleContainer}>
            <div className={styles.titlePriceContainer}>
              <Typography
                variant="span"
                type="bold"
                letter="uppercase"
                className="clear-margin-padding"
              >
                {t("product:customerReview")}
              </Typography>
              <Typography
                type="reguler"
                variant="p"
                letter="capitalize"
                className="clear-margin-padding"
              >
                5 {t("produc:review")}
              </Typography>
            </div>
            <div className={styles.shareContainer}>
              <Button variant="outlined">{t("product:writeReview")}</Button>
            </div>
          </div>
          <div className={styles.reviewContainer}>
            <CustomerReview />
            <CustomerReview />
            <div className={styles.btnLoadReview}>
              <Button variant="text" disabled={true}>
                <Typography variant="span" type="reguler" letter="capitalize" className={styles.textLoadReview}>
                  {t("product:moreReview")}
                </Typography>
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.carouselContainer}>
          <Caraousel data={data} title={t("product:recomendedTitle")} />
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
