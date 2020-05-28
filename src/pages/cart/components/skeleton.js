import Skeleton from '@material-ui/lab/Skeleton';
import { Box } from '@material-ui/core';
import useStyles from '../style';

const SkeletonCart = () => {
    const styles = useStyles();
    return (
        <Box className={styles.container}>
            <Skeleton variant="rect" width="100%" height={40} style={{ marginBottom: 10 }} />
            <Skeleton variant="rect" width="100%" height={300} />
            <Skeleton variant="rect" width="100%" height={40} style={{ marginTop: 10, marginBottom: 10 }} />
            <Skeleton variant="rect" width="100%" height={300} />
        </Box>
    );
};

export default SkeletonCart;
