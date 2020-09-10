import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonStoreLocator = () => (
    <>
        <div className="row">
            <div className="col-md-3">
                <Skeleton variant="rect" width="100%" height={515} />
            </div>
            <div className="col-md-9">
                <Skeleton variant="rect" width="100%" height={463} />
                <Skeleton variant="rect" width="100%" height={40} style={{ marginTop: 12 }} />
            </div>
        </div>
    </>
);

export default SkeletonStoreLocator;
