import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@core_modules/searchresult/components/style';

const SkeletonSeller = () => {
    const styles = useStyles();
    return (
        <>
            <div className={styles.titleContainer}>
                <div className={styles.sellerContainer}>
                    <div className={styles.imageContainer}>
                        <Skeleton animation="wave" variant="rect" width={50} height={55} />
                    </div>
                    <div>
                        <Skeleton animation="wave" variant="rect" width={150} height={30} />
                        <Skeleton animation="wave" variant="text" width={150} height={30} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SkeletonSeller;
