import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './style';

export default () => {
    const styles = useStyles();
    return (
        <div className="column">
            <Skeleton animation="wave" variant="rect" width="100%" height="70vh" />
            <div className={styles.container}>
                <div className="row mr-15">
                    <Skeleton animation="wave" variant="text" width="70%" height={40} />
                    <div className={styles.right}>
                        <Skeleton animation="wave" variant="text" width="95%" height={40} />
                    </div>
                </div>
                <div className="row mr-15">
                    <Skeleton animation="wave" variant="text" width="70%" height={40} />
                </div>
                <div className={styles.footer}>
                    <Skeleton classes={{ rect: styles.btn }} animation="wave" variant="rect" width="75%" height={40} />
                </div>
            </div>
        </div>
    );
};
