import Banner from '@components/Slider/Banner';
import Carousel from '@components/Slider/Carousel';
import Span from '@components/Span';
import SpanProduct from '@components/SpanProduct';
import { useSelector } from 'react-redux';
import useStyles from './style';

const banner = [
    {
        img:
      '/assets/img/sample/home-slider.png',
        link: '/',
    },
    {
        img: '/assets/img/sample/home-slider.png',
        link: '/',
    },
    {
        img: '/assets/img/sample/home-slider.png',
        link: '/',
    },
];

const carouselData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const HomePage = () => {
    const styles = useStyles();
    const storeConfig = useSelector((state) => state.config.storeConfig);
    const logoUrl = `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`;
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={logoUrl} alt="logo" className={styles.imgLogo} />
                </div>
                <Banner data={banner} height="95vh" />
            </div>
            <div className={styles.slider}>
                <Carousel data={carouselData} />
            </div>
            <Span>
                <img src="assets/img/noun_Image.svg" alt="label" />
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
