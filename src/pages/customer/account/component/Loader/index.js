import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './style';

export default () => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <Skeleton animation="wave" variant="text" width="50%" height={30} className="m-15" />
            <Skeleton animation="wave" variant="rect" height={100} width="60%" className="m-15" />
            <Skeleton animation="wave" variant="text" height={50} width="60%" className="m-15" />
            <Skeleton animation="wave" variant="text" height={50} width="70%" className="m-15" />
            <Skeleton animation="wave" variant="text" height={50} width="60%" className="m-15" />
            <Skeleton animation="wave" variant="text" height={50} width="50%" className="m-15" />
            <Skeleton animation="wave" variant="text" height={50} width="50%" className="m-15" />
        </div>
    );
};
