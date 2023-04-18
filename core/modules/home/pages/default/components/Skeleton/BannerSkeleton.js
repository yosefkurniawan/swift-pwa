/* eslint-disable max-len */
import Skeleton from '@common_skeleton';
import Thumbor from '@common_image';
import useStyles from '@core_modules/home/pages/default/components/style';

const BannerSliderSkeleteon = (props) => {
    const { logoUrl, storeConfig } = props;
    const styles = useStyles();
    return (
        <span className={styles.skeletonWrapper}>
            <Thumbor
                className="logo hidden-desktop"
                src={logoUrl}
                alt="logo"
                width={120}
                height={52}
                storeConfig={storeConfig}
            />
            <Skeleton
                variant="rect"
                animation="wave"
                xsStyle={{ width: '100%', height: `${storeConfig.pwa?.home_slider_mobile_height}px` }}
                mdStyle={{ width: '100%', height: `${storeConfig.pwa?.home_slider_desktop_height}px` }}
            />
        </span>
    );
};

export default BannerSliderSkeleteon;
