import Skeleton from '@common_skeleton';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useStyles from '../style';

const CategoryListSkeleteon = () => {
    const styles = useStyles();
    return (
        <div className={styles.skeletonWrapper}>
            <Grid container spacing={2} direction="column" alignItems="center" className="hidden-desktop">
                <Skeleton
                    className={styles.skeleton}
                    variant="rect"
                    width="100%"
                    xsStyle={{ height: '60vw' }}
                    mdStyle={{ height: '577px' }}
                    animation="wave"
                />
                <Skeleton className={styles.skeleton} style={{ alignSelf: 'center' }} variant="rect" width="35%" height={10} animation="wave" />
                <Skeleton className={styles.skeleton} variant="rect" width="75%" height={10} animation="wave" />
            </Grid>
            <Box display="flex" justifyContent="center" className="hidden-mobile">
                <Skeleton
                    className={styles.skeleton}
                    variant="rect"
                    width="40%"
                    mdStyle={{ height: '350px' }}
                    animation="wave"
                    style={{ alignSelf: 'center' }}
                />
                <Skeleton
                    className={styles.skeleton}
                    style={{ alignSelf: 'center', marginLeft: '20%' }}
                    variant="rect"
                    width="10%"
                    height={30}
                    animation="wave"
                />
            </Box>
            <Box display="flex" justifyContent="center" className="hidden-mobile">
                <Skeleton
                    className={styles.skeleton}
                    style={{ alignSelf: 'center', marginRight: '20%' }}
                    variant="rect"
                    width="10%"
                    height={30}
                    animation="wave"
                />
                <Skeleton
                    className={styles.skeleton}
                    variant="rect"
                    width="40%"
                    mdStyle={{ height: '350px' }}
                    animation="wave"
                    style={{ alignSelf: 'center' }}
                />
            </Box>
        </div>
    );
};

export default CategoryListSkeleteon;
