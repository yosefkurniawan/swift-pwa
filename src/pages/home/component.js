import Banner from "@components/slider/Banner";
import Carousel from "@components/slider/Carousel";
import Span from "@components/Span";
import SpanProduct from "@components/SpanProduct";
import useStyles from "./style.js";

const data = [
  {
    img:
      "https://www.creohouse.co.id/wp-content/uploads/2016/09/jasa-desain-banner-web-creohouse.jpg",
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

const HomePage = ({ t }) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <h1 className={styles.titleLogo}>{t("common:home:logoName")}</h1>
        </div>
        <Banner data={data} />
      </div>
      <div className={styles.slider}>
        <Carousel data={data} />
      </div>
      <Span>
        <img src="assets/img/noun_Image.svg" />
      </Span>
      <div className={styles.slider}>
        <Carousel data={data} />
      </div>
      <div className={styles.slider}>
        <SpanProduct />
      </div>
      <div className={styles.slider}>
        <SpanProduct />
      </div>
    </div>
  );
};

export default HomePage;