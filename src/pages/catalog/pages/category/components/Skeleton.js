import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import ProductItemLoading from '@components/ProductItem/component/Skeleton';
import GridList from '@components/GridList';
import useStyles from '../style';

const SkeletonCategory = () => {
    const styles = useStyles();
    return (
        <Box className={styles.container}>
            <Skeleton variant="rect" width="100%" height="40vh" />
            <Skeleton variant="rect" width="100%" height={50} style={{ marginTop: 10, marginBottom: 10 }} />
            <Skeleton variant="rect" width="100%" height={50} style={{ marginBottom: 10 }} />
            <GridList
                data={[1, 1, 1, 1]}
                ItemComponent={ProductItemLoading}
                gridItemProps={{ xs: 6, sm: 4, md: 3 }}
            />
        </Box>
    );
};

export default SkeletonCategory;
