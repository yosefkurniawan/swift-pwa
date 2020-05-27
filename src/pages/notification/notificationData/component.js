import { useRouter } from 'next/router';
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
            <div>{localDateString(item.createdAt)}</div>
            <div>{item.subject}</div>
            <div>{item.content}</div>
        </div>
    );
};

export default NotificationData;
