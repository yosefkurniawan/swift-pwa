/* eslint-disable max-len */
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './style';

export default () => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <Skeleton animation="wave" variant="text" width="calc(100% - 100px)" height={30} style={{ marginLeft: 50, marginRight: 50, marginTop: 20 }} />
            <Skeleton animation="wave" variant="rect" height={50} width="calc(100% - 100px)" style={{ marginLeft: 50, marginRight: 50 }} />
            <Skeleton animation="wave" variant="text" height={35} width="calc(100% - 100px)" style={{ marginLeft: 50, marginRight: 50 }} />
            <Skeleton animation="wave" variant="text" height={35} width="calc(100% - 100px)" style={{ marginLeft: 50, marginRight: 50 }} />
            <Skeleton animation="wave" variant="text" height={35} width="calc(100% - 120px)" style={{ marginLeft: 60, marginRight: 60 }} />
            <Skeleton animation="wave" variant="text" height={35} width="calc(100% - 100px)" style={{ marginLeft: 50, marginRight: 50 }} />
            <Skeleton animation="wave" variant="text" height={35} width="calc(100% - 120px)" style={{ marginLeft: 60, marginRight: 60 }} />
            <Skeleton
                animation="wave"
                variant="rect"
                width="100%"
                height={150}
                style={{ marginTop: 70 }}
            />
        </div>
    );
};
