import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '../style';

const ProductItemSkeleton = () => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <Skeleton variant="rect" width={240} height={300} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
        </div>
    );
};

export default ProductItemSkeleton;
