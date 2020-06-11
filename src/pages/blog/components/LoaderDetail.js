import Skeleton from '@material-ui/lab/Skeleton';

const style = {
    padding: 20,
    marginBottom: 20,
};

export default () => (
    <>
        <Skeleton animation="wave" variant="react" width="100%" height={40} />
        <div style={style}>
            <Skeleton animation="wave" variant="text" width="100%" height={30} />
            <Skeleton animation="wave" variant="text" width="70%" height={30} style={{ marginBottom: 10 }} />
            <Skeleton animation="wave" variant="rect" width="100%" height={320} />
            <Skeleton animation="wave" variant="text" width="98%" height={20} />
            <Skeleton animation="wave" variant="text" width="95%" height={20} />
            <Skeleton animation="wave" variant="text" width="90%" height={20} style={{ marginBottom: 10 }} />

            <Skeleton animation="wave" variant="text" width="98%" height={20} />
            <Skeleton animation="wave" variant="text" width="95%" height={20} />
            <Skeleton animation="wave" variant="text" width="90%" height={20} style={{ marginBottom: 10 }} />

            <Skeleton animation="wave" variant="text" width="98%" height={20} />
            <Skeleton animation="wave" variant="text" width="95%" height={20} />
            <Skeleton animation="wave" variant="text" width="90%" height={20} style={{ marginBottom: 10 }} />

            <Skeleton animation="wave" variant="text" width="50%" height={30} style={{ marginBottom: 10 }} />
        </div>
    </>
);
