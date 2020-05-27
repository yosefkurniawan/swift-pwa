import { useRouter } from 'next/router';
import Typography from '@components/Typography';
import gqlServices from './service/graphql';

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


    const { loading, data, error } = readNotificationStatus;
    if (loading) return <p> Loading......</p>;
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
