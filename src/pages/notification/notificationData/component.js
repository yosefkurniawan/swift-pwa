import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@common_typography';
import gqlServices from './service/graphql';

const NotificationDataSkeleton = () => {
    const SkeletonRect = ({ width, height, marginBottom }) => (
        <Skeleton
            style={{ marginBottom }}
            variant="rect"
            width={width}
            height={height}
            animation="wave"
        />
    );
    return (
        <div className="container">
            <Grid container direction="column">
                <SkeletonRect width={90} height={10} marginBottom={18} />
                <SkeletonRect width={250} height={16} marginBottom={14} />
                <SkeletonRect width={270} height={12} marginBottom={12} />
                <SkeletonRect width={255} height={12} marginBottom={12} />
            </Grid>
        </div>
    );
};

const NotificationData = () => {
    const router = useRouter();
    const [readNotification, readNotificationStatus] = gqlServices.readNotification();

    React.useEffect(() => {
        if (!router.query.notif) {
            router.push('/inboxnotification/notification');
        } else {
            readNotification({
                variables: { entityId: Number(router.query.notif) },
            });
        }
    }, []);

    const {
        called, loading, data, error,
    } = readNotificationStatus;
    if (!called) return null;
    if (loading) return <NotificationDataSkeleton />;
    if (error) return <p>{`Error: ${error.message}`}</p>;
    if (!data) return <p>Not found</p>;

    const localDateString = (stringTime) => new Date(stringTime).toLocaleDateString(
        {},
        {
            weekday: 'short', year: 'numeric', month: 'long', day: 'numeric',
        },
    );
    const item = data.readNotification.items[0];

    return (
        <div className="container">
            <Typography variant="p" style={{ marginBottom: 12 }} size="10" type="regular">
                {localDateString(item.createdAt)}
            </Typography>
            <Typography variant="p" size="14" type="regular">
                {item.subject}
            </Typography>
            <Typography variant="p" size="12" type="regular">
                {item.content}
            </Typography>
        </div>
    );
};

export default NotificationData;
