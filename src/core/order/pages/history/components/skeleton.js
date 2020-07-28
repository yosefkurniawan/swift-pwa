import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '../style';

export default () => {
    const styles = useStyles();
    const data = [1, 2, 3];
    return (
        <div className={styles.container}>
            {data.map((i) => (
                <div key={i} className={styles.itemContainer}>
                    <div className={styles.contentItem}>
                        <Skeleton variant="text" width={70} height={15} animation="wave" />
                        <Skeleton variant="text" width={120} height={20} animation="wave" />
                        <div className={styles.detailItem}>
                            <div className={`column ${styles.columnLabel}`}>
                                <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                <Skeleton variant="text" width="80%" height={15} animation="wave" />
                            </div>
                            <div className={styles.detailContent}>
                                <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                <Skeleton variant="text" width="80%" height={15} animation="wave" />
                                <Skeleton variant="text" width="80%" height={15} animation="wave" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
