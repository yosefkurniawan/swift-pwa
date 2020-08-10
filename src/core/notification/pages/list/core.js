import Layout from '@layout';
import Router from 'next/router';
import { customerNotificationList } from '../../services/graphql';

const NotificationList = (props) => {
    const {
        t, Content, pageConfig, Skeleton,
    } = props;
    const config = {
        title: t('notification:notificationList:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('notification:notificationList:pageTitle'),
        bottomNav: false,
    };
    const { loading, data, error } = customerNotificationList();

    if (loading) return <Layout pageConfig={pageConfig || config}><Skeleton /></Layout>;
    if (error) return <p>{`Error: ${error.message}`}</p>;
    if (!data) return <p>Not found</p>;

    const localDateString = (stringTime) => new Date(stringTime).toLocaleDateString(
        {},
        {
            weekday: 'short', year: 'numeric', month: 'long', day: 'numeric',
        },
    );

    const handleItemClick = (item) => {
        Router.push({
            pathname: '/inboxnotification/notification/data',
            query: { notif: item.entityId },
        });
    };
    return (
        <Layout pageConfig={pageConfig || config}>
            <Content
                t={t}
                data={data}
                localDateString={localDateString}
                handleItemClick={handleItemClick}
            />
        </Layout>
    );
};

export default NotificationList;
