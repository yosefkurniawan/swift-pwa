import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './style';

export default () => {
    const styles = useStyles();
    return (
        <div className={styles.root}>
            <Skeleton animation="wave" variant="rect" height={156} width="100%" style={{ marginBottom: 15, marginTop: 10 }} />
            <Skeleton animation="wave" variant="rect" height={156} width="100%" style={{ marginBottom: 15, marginTop: 10 }} />
            <Skeleton animation="wave" variant="rect" height={156} width="100%" style={{ marginBottom: 15, marginTop: 10 }} />
        </div>
    );
};
