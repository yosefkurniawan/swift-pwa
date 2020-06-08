import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import useStyles from '../style';

export default () => {
    const styles = useStyles();
    return (
        <>
            <Skeleton animation="wave" variant="rect" width="100%" height={40} style={{ marginBottom: 10 }} />
            <div className={classNames(styles.block)} style={{ height: '50%' }}>
                <Skeleton animation="wave" variant="text" width={120} height={25} />
                <Skeleton animation="wave" variant="rect" width="100%" height={40} />
                <Skeleton animation="wave" variant="text" width={120} height={25} />
                <Skeleton animation="wave" variant="rect" width="100%" height={40} />
            </div>
            <div className={styles.block}>
                <Skeleton animation="wave" variant="text" width="50%" height={30} />
                <div className={styles.itemContainer}>
                    <Skeleton animation="wave" variant="rect" width={105} height={130} />
                    <div className={styles.detailItem}>
                        <Skeleton animation="wave" variant="text" width={90} height={15} />
                        <Skeleton animation="wave" variant="text" width={120} height={15} />
                        <Skeleton animation="wave" variant="text" width={120} height={15} />
                        <Skeleton animation="wave" variant="text" width={120} height={15} />
                        <div className="flex-grow" />
                    </div>
                </div>
            </div>
        </>
    );
};
