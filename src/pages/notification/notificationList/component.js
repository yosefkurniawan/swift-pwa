import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import Skeleton from '@material-ui/lab/Skeleton';
import Router from 'next/router';
import Typography from '@components/Typography';
import gqlService from './service/graphql';

const NotificationListSkeleton = () => {
    const SkeletonRect = ({ width, height }) => (
        <Skeleton
            style={{ margin: '8px 0' }}
            variant="rect"
            width={width}
            height={height}
            animation="wave"
        />
    );
    const SkeletonItem = () => (
        <Grid container direction="column">
            <SkeletonRect width={250} height={16} />
            <SkeletonRect width={90} height={10} />
        </Grid>
    );

    return (
        <div className="container">
            {[0, 1, 2, 3, 4].map((i) => (
                <ListItem key={i} divider>
                    <SkeletonItem />
                </ListItem>
            ))}
        </div>
    );
};

const NotificationList = () => {
    const { loading, data, error } = gqlService.customerNotificationList();

    if (loading) return <NotificationListSkeleton />;
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
        <div className="container" style={{ paddingTop: 0 }}>
            <List>
                {data.customerNotificationList.items.map((item, i) => (
                    <ListItem key={i} divider button onClick={() => handleItemClick(item)}>
                        <ListItemText
                            primary={(
                                <Typography variant="label" type={item.unread ? 'bold' : 'regular'} size="14">
                                    {item.subject}
                                </Typography>
                            )}
                            secondary={(
                                <Typography variant="label" type={item.unread ? 'bold' : 'regular'}>
                                    {localDateString(item.createdAt)}
                                </Typography>
                            )}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default NotificationList;
