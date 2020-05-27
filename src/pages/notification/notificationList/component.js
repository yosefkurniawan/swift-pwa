/* eslint-disable no-console */
import { List, ListItem, ListItemText } from '@material-ui/core';
import Typography from '@components/Typography';
import gqlService from './service/graphql';

const NotificationList = () => {
    const { loading, data, error } = gqlService.customerNotificationList();

    if (loading) return <p> Loading......</p>;
    if (error) return <p>{`Error: ${error.message}`}</p>;
    if (!data) return <p>Not found</p>;

    console.log(data);
    const localDateString = (stringTime) => new Date(stringTime).toLocaleDateString(
        {},
        {
            weekday: 'short', year: 'numeric', month: 'long', day: 'numeric',
        },
    );

    const handleItemClick = (item) => {
        console.log(item);
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
