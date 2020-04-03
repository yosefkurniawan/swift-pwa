import Button from "@components/Button";
import Banner from "@components/Slider/Banner";
import Caraousel from "@components/Slider/Carousel";
import Typography from "@components/Typography";
import currency from "@helpers/currency";
import { Box, IconButton } from "@material-ui/core";
import {
  FavoriteBorderOutlined,
  ShareOutlined,
  Favorite
} from "@material-ui/icons";
import classNames from "classnames";
import React from "react";
import useStyles from "../style";
import CustomerReview from "./CustomerReview";
import ExpandDetail from "./ExpandDetail";
import OptionDialog from "./OptionDialog";
import RatingStar from "./RatingStar";
import RightDrawer from "./RightDrawer";
import SharePopup from "./SharePopup";
import AddReviewDialog from "./AddReviewDialog";

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

const ProductPage = props => {
  const { t, i18n } = props;
  const styles = useStyles();
  const [openOption, setOpenOption] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openShare, setOpenShare] = React.useState(false);
  const [feed, setFeed] = React.useState(false);
  const [openReview, setOpenReview] = React.useState(false);

  const favoritIcon = feed ? (
    <Favorite className={styles.iconShare} />
  ) : (
    <FavoriteBorderOutlined className={styles.iconShare} />
  );

  const handleFeed = () => {
    setFeed(!feed);
  };

  return (
    <>
      <OptionDialog
        {...props}
        open={openOption}
        setOpen={() => setOpenOption(!openOption)}
      />
      <SharePopup
        open={openShare}
        setOpen={() => setOpenShare(!openShare)}
        {...props}
      />
      <AddReviewDialog
        open={openReview}
        setOpen={() => setOpenReview(!openReview)}
        {...props}
      />
      <Box className={styles.container}>
        <div className={styles.headContainer}>
          <Banner data={data} height="70vh" />
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
              <IconButton className={styles.btnShare} onClick={handleFeed}>
                {favoritIcon}
              </IconButton>
              <IconButton
                className={styles.btnShare}
                onClick={() => setOpenShare(true)}
              >
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
                className={classNames("clear-margin-padding", styles.title)}
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
              <Button onClick={() => setOpenReview(true)} variant="outlined">{t("product:writeReview")}</Button>
            </div>
          </div>
          <div className={styles.reviewContainer}>
            <CustomerReview />
            <CustomerReview />
            <div className={styles.btnLoadReview}>
              <Button variant="text" disabled={true}>
                <Typography
                  variant="span"
                  type="reguler"
                  letter="capitalize"
                  className={styles.textLoadReview}
                >
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
          <Button
            className={styles.btnAddToCard}
            color="primary"
            onClick={() => setOpenOption(true)}
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
      </Box>
    </>
  );
};

export default ProductPage;
