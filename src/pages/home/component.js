import Banner from "@components/Slider/Banner";
import Carousel from "@components/Slider/Carousel";
import Span from "@components/Span";
import SpanProduct from "@components/SpanProduct";
import useStyles from "./style.js";

const data = [
  {
    img:
      "/assets/img/sample/home-slider.png",
    link: "/"
  },
  {
    img: "/assets/img/sample/home-slider.png",
    link: "/"
  },
  {
    img: "/assets/img/sample/home-slider.png",
    link: "/"
  }
];

const carouselData = [1,2,3,4,5,6,7,8,9]

const HomePage = ({ t }) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <h1 className={styles.titleLogo}>{t("common:home:logoName")}</h1>
        </div>
        <Banner data={data} height="95vh" />
      </div>
      <div className={styles.slider}>
        <Carousel data={carouselData} />
      </div>
      <Span>
        <img src="assets/img/noun_Image.svg" />
      </Span>
      <div className={styles.slider}>
        <Carousel data={carouselData} />
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