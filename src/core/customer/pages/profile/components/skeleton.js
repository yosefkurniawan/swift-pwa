import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './style';

const ProfilePageSkeleton = () => {
    const styles = useStyles();
    const TextFieldSkeleton = () => (
        <Grid container className={styles.skeletonField} spacing={2} direction="column">
            <Skeleton className={styles.skeleton} variant="rect" width="25%" height={18} animation="wave" />
            <Skeleton className={styles.skeleton} variant="rect" width="80%" height={18} animation="wave" />
        </Grid>
    );
    const CheckboxSkeleton = () => (
        <Grid container className={styles.skeletonField} spacing={1} direction="row">
            <Skeleton className={styles.skeleton} variant="rect" width="20px" height={18} animation="wave" />
            <Skeleton className={styles.skeleton} variant="rect" width="30%" height={18} animation="wave" />
        </Grid>
    );
    return (
        <div className={styles.skeletonContainer}>
            <TextFieldSkeleton />
            <TextFieldSkeleton />
            <TextFieldSkeleton />
            <CheckboxSkeleton />
            <CheckboxSkeleton />
            <TextFieldSkeleton />
            <Grid container className={styles.skeletonField} alignItems="center" direction="column">
                <Skeleton className={styles.skeleton} variant="rect" width="90%" height={32} animation="wave" />
            </Grid>
        </div>
    );
};

export default ProfilePageSkeleton;
