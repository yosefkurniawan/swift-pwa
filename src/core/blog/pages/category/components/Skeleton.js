import Skeleton from '@material-ui/lab/Skeleton';

const style = {
    padding: 20,
    marginBottom: 20,
};

export default () => (
    <>
        <div style={style}>
            <Skeleton animation="wave" variant="text" width="100%" height={30} />
            <Skeleton animation="wave" variant="text" width="70%" height={20} />
            <Skeleton animation="wave" variant="rect" width="100%" height={320} />
            <Skeleton animation="wave" variant="text" width="95%" height={20} />
            <Skeleton animation="wave" variant="text" width="80%" height={20} />
            <Skeleton animation="wave" variant="rect" width="35%" height={50} />
        </div>
        <div style={style}>
            <Skeleton animation="wave" variant="text" width="100%" height={30} />
            <Skeleton animation="wave" variant="text" width="70%" height={20} />
            <Skeleton animation="wave" variant="rect" width="100%" height={320} />
            <Skeleton animation="wave" variant="text" width="95%" height={20} />
            <Skeleton animation="wave" variant="text" width="80%" height={20} />
            <Skeleton animation="wave" variant="rect" width="35%" height={50} />
        </div>
        <div style={style}>
            <Skeleton animation="wave" variant="text" width="100%" height={30} />
            <Skeleton animation="wave" variant="text" width="70%" height={20} />
            <Skeleton animation="wave" variant="rect" width="100%" height={320} />
            <Skeleton animation="wave" variant="text" width="95%" height={20} />
            <Skeleton animation="wave" variant="text" width="80%" height={20} />
            <Skeleton animation="wave" variant="rect" width="35%" height={50} />
        </div>
    </>
);
