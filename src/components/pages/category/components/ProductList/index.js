import React from "react";
import useStyles from "./style";
import { Grid } from "@material-ui/core";
import Image from "../../../../commons/Image";
import Typography from "../../../../commons/Typography";
import Button from "../../../../commons/Button";
import PriceFormat from "../../../../commons/price/priceFormat";
import { Favorite, FavoriteBorderOutlined } from "@material-ui/icons";
import classNames from "classnames";
import ButtonColor from "../../../../commons/ButtonColor";

const color = ["#343434", "#6E6E6E", "#989898", "#C9C9C9"];

const ItemProduct = ({ data = {}, key = "" }) => {
  const styles = useStyles();
  const [feed, setFeed] = React.useState(false);
  const classFeedActive = classNames(styles.iconFeed, styles.iconActive);
  const FeedIcon = feed ? (
    <Favorite className={classFeedActive} />
  ) : (
    <FavoriteBorderOutlined className={styles.iconFeed} />
  );

  return (
    <Grid item xs={6} sm={6} md={3} key={key}>
      <div className={styles.itemContainer}>
        <div className={styles.imgItem}>
          <Image src="zeit.svg" className={styles.imgProduct} />
        </div>
        <div className={styles.detailItem}>
          <div className={styles.descItem}>
            <Typography variant="p" className={styles.clearMarginPadding}>
              Product
            </Typography>
            <Typography variant="p" className={styles.clearMarginPadding}>
              <PriceFormat currency="IDR" value={90000} />
            </Typography>
            <div className={styles.colorContainer}>
              {color.map((clr, index) => (
                <ButtonColor color={clr} key={index} size={16} className={styles.btnColor} />
              ))}
            </div>
          </div>
          <Button
            className={styles.btnFeed}
            variant="icon"
            onClick={() => setFeed(!feed)}
          >
            {FeedIcon}
          </Button>
        </div>
      </div>
    </Grid>
  );
};

const Component = ({ data = [], className = {} }) => {
  const styles = useStyles();

  return (
    <Grid container spacing={1} className={styles.container}>
      {data.map((item, index) => (
        <ItemProduct key={index} />
      ))}
    </Grid>
  );
};

export default Component;
