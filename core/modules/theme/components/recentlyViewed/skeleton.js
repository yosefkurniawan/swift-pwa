import useStyles from '@core_modules/theme/components/recentlyViewed/style';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonRecently = () => {
    const styles = useStyles();
    return (
        <div className={styles.skeletonContainer}>
            <Skeleton
                variant="rect"
                width={200}
                height={250}
                animation="wave"
            />
            <Skeleton
                variant="rect"
                width={200}
                height={250}
                animation="wave"
            />
            <Skeleton
                variant="rect"
                width={200}
                height={250}
                animation="wave"
            />
        </div>
    );
};

export default SkeletonRecently;
