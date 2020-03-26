import React from "react";
import useStyles from "../style";
import { Grid, Box } from "@material-ui/core";
import Header from "../../../commons/Header";
import Banner from "../../../commons/slider/Banner";

const data = [
  {
    img: "https://www.creohouse.co.id/wp-content/uploads/2016/09/jasa-desain-banner-web-creohouse.jpg",
    link: "/"
  },
  {
    img: "assets/img/noun_Image.svg",
    link: "/"
  }
];

const Component = () => {
  const styles = useStyles();
  return (
    <Box className={styles.container}>
      <div className={styles.headContainer}>
        <Header className={styles.header} />
        <Banner data={data} />
      </div>
      <div>
            tabs
      </div>
      <div>
          filter
      </div>
      <div>
          produk
      </div>
    </Box>
  );
};

export default Component;
