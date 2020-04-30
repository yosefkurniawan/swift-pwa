import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '../style';

const ProductItemSkeleton = () => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <Skeleton variant="rect" width="100%" height={200} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
        </div>
    );
};

export default ProductItemSkeleton;
