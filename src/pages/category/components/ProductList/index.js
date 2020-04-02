import React from "react";
import useStyles from "./style";
import { Grid } from "@material-ui/core";
import Typography from "@components/Typography";
import Button from "@components/Button";
import { Favorite, FavoriteBorderOutlined } from "@material-ui/icons";
import classNames from "classnames";
import ButtonColor from "@components/ButtonColor";
import currency from "@helpers/currency";

const color = ["#343434", "#6E6E6E", "#989898", "#C9C9C9"];

const ItemProduct = ({ data = {},}) => {
  const styles = useStyles();
  const [feed, setFeed] = React.useState(false);
  const classFeedActive = classNames(styles.iconFeed, styles.iconActive);
  const FeedIcon = feed ? (
    <Favorite className={classFeedActive} />
  ) : (
    <FavoriteBorderOutlined className={styles.iconFeed} />
  );

  return (
    <Grid item xs={6} sm={6} md={3} >
      <div className={styles.itemContainer}>
        <div className={styles.imgItem}>
          <img src="/assets/img/noun_Image.svg" className={styles.imgProduct} />
        </div>
        <div className={styles.detailItem}>
          <div className={styles.descItem}>
            <Typography variant="p" className={styles.clearMarginPadding}>
              Product
            </Typography>
            <Typography variant="p" className={styles.clearMarginPadding}>
              {currency({ value : 90000, currency : "idr" })}
            </Typography>
            <div className={styles.colorContainer}>
              {color.map((clr, index) => (
                <ButtonColor key={index} color={clr} key={index} size={16} className={styles.btnColor} />
              ))}
            </div>
          </div>
          <Button
            className={styles.btnFeed}
            variant="text"
            onClick={() => setFeed(!feed)}
          >
            {FeedIcon}
          </Button>
        </div>
      </div>
    </Grid>
  );
};

const ProductList = ({ data = [], className = {} }) => {
  const styles = useStyles();

  return (
    <Grid container spacing={1} className={styles.container}>
      {data.map((item, index) => (
        <ItemProduct key={index} />
      ))}
    </Grid>
  );
};

export default ProductList;
