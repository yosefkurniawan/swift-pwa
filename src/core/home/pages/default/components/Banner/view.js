import Banner from '@common_banner';
import classNames from 'classnames';
import useStyles from '../style';

const BannerView = (props) => {
    const { images, logoUrl } = props;
    const styles = useStyles();
    return (
        <>
            <div className={styles.header}>
                <div className={classNames(styles.logo, 'hidden-desktop')}>
                    <img src={logoUrl} alt="logo" className={styles.imgLogo} />
                </div>
                {images && images.length && <Banner data={images} showArrow />}
            </div>
        </>
    );
};

export default BannerView;
