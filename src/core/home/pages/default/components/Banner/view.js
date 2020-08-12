import Banner from '@common_banner';
import useStyles from '../style';

const BannerView = (props) => {
    const { images, logoUrl } = props;
    const styles = useStyles();
    return (
        <>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={logoUrl} alt="logo" className={styles.imgLogo} />
                </div>
                {images && images.length && <Banner data={images} />}
            </div>
        </>
    );
};

export default BannerView;
