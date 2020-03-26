import { Grid, Box } from "@material-ui/core";
import classNames from "classnames";
import useStyles from "./style.js";
import Banner from "../../commons/slider/Banner";
import Carousel from "../../commons/slider/Carousel";
import Span from "../../commons/Span";
import Image from "../../commons/Image";
import SpanProduct from "../../commons/SpanProduct";

const data = [
  {
    img: "https://www.creohouse.co.id/wp-content/uploads/2016/09/jasa-desain-banner-web-creohouse.jpg",
    link: "/"
  },
  {
    img: "assets/img/noun_Image.svg",
    link: "/"
  },
  {
    img: "assets/img/noun_Image.svg",
    link: "/"
  }
];

const Component = ({ t }) => {
  const styles = useStyles();
  const headerClass = classNames(styles.slider, styles.header);
  return (
    <Box className={styles.container}>
      <Grid container spacing={10} justify='space-between'>
        <Grid item sm={12} md={12} lg={12} xs={12}>
          <div className={headerClass}>
            <div className={styles.logo}>
              <h1 className={styles.titleLogo}>{t("common:home:logoName")}</h1>
            </div>
            <Banner data={data} />
          </div>
        </Grid>
        <Grid item sm={12} md={12} lg={12} xs={12}>
          <div className={styles.slider}>
            <Carousel data={data} />
          </div>
        </Grid>
        <Grid item sm={12} md={12} lg={12} xs={12}>
          <Span>
            <Image src="assets" />
          </Span>
        </Grid>
        <Grid item sm={12} md={12} lg={12} xs={12}>
          <div className={styles.slider}>
            <Carousel data={data} />
          </div>
        </Grid>
        <Grid item sm={12} md={12} lg={12} xs={12}>
          <SpanProduct />
        </Grid>
        <Grid item sm={12} md={12} lg={12} xs={12}>
          <SpanProduct />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Component;
