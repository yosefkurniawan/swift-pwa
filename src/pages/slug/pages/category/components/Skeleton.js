import Skeleton from '@common_skeleton';
import ProductListSkeleton from '@common_productlist/component/Skeleton';
import useStyles from '../style';

const SkeletonCategory = () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <Skeleton
                variant="rect"
                xsStyle={{ width: '100vw', height: '60vw' }}
                mdStyle={{ width: '960px', height: '577px' }}
            />
            <Skeleton variant="text" width={225} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="40%" style={{ marginBottom: 20 }} />
            <ProductListSkeleton />
        </div>
    );
};

export default SkeletonCategory;
