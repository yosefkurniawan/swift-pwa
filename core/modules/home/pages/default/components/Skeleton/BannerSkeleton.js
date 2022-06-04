/* eslint-disable max-len */
import Skeleton from '@common_skeleton';
import useStyles from '@core_modules/home/pages/default/components/style';

const BannerSliderSkeleteon = (props) => {
    const { logoUrl, storeConfig } = props;
    const styles = useStyles();
    return (
        <div className={styles.skeletonWrapper}>
            <img src={logoUrl} className="logo hidden-desktop" alt="Logo" />
            <Skeleton variant="rect" animation="wave" xsStyle={{ width: '100%', height: `${storeConfig.pwa.home_slider_mobile_height}px` }} mdStyle={{ width: '100%', height: `${storeConfig.pwa.home_slider_desktop_height}px` }} />
        </div>
    );
};

export default BannerSliderSkeleteon;
