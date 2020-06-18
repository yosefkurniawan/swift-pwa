import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import ProductItemLoading from '@components/ProductItem/component/Skeleton';
import GridList from '@components/GridList';
import useStyles from '../style';

const SkeletonCategory = () => {
    const styles = useStyles();
    return (
        <Box className={styles.container}>
            <Skeleton variant="rect" className={styles.skeletonBanner} />
            <Skeleton variant="text" width={225} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="40%" style={{ marginBottom: 20 }} />
            <GridList
                data={[1, 1, 1, 1]}
                ItemComponent={ProductItemLoading}
                gridItemProps={{ xs: 6, sm: 4, md: 3 }}
            />
        </Box>
    );
};

export default SkeletonCategory;
