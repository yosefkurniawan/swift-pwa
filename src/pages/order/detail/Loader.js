import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import useStyles from './style';

export default () => {
    const styles = useStyles();
    return (
        <div className="column">
            <div className={classNames(styles.block, styles.detail)}>
                <Skeleton variant="text" width={120} height={25} />
                <Skeleton variant="text" width={100} height={15} />
                <Skeleton variant="text" width={80} height={15} />
                <Skeleton variant="text" width={150} height={15} />
                <Skeleton variant="text" width={150} height={15} />
                <Skeleton variant="text" width={120} height={15} />
            </div>
            <div className={styles.block}>
                <div className={styles.itemContainer}>
                    <Skeleton variant="rect" width={105} height={130} />
                    <div className={styles.detailItem}>
                        <Skeleton variant="text" width={90} height={15} />
                        <Skeleton variant="text" width={120} height={15} />
                        <Skeleton variant="text" width={120} height={15} />
                        <Skeleton variant="text" width={120} height={15} />
                        <div className="flex-grow" />
                    </div>
                </div>
            </div>
        </div>
    );
};
