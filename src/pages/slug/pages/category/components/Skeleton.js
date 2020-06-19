import Skeleton from '@components/Skeleton';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ProductItemLoading from '@components/ProductItem/component/Skeleton';
// import GridList from '@components/GridList';
import useStyles from '../style';

const SkeletonCategory = () => {
    const styles = useStyles();
    return (
        <Box className={styles.container}>
            <Skeleton
                variant="rect"
                xsStyle={{ width: '100vw', height: '60vw' }}
                mdStyle={{ width: '960px', height: '577px' }}
            />
            <Skeleton variant="text" width={225} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="40%" style={{ marginBottom: 20 }} />
            {/* <GridList
                data={[1, 1, 1, 1, 1, 1]}
                ItemComponent={ProductItemLoading}
                gridItemProps={{ xs: 6, sm: 4, md: 3 }}
            /> */}
            <Grid
                container
                spacing={1}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
                    <Grid
                        key={el}
                        item
                        xs={6}
                        sm={4}
                        md={3}
                        className={el <= 2 ? 'hidden-xs hidden-sm' : ''}
                    >
                        <ProductItemLoading />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SkeletonCategory;
