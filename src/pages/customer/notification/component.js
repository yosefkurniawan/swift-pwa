import { List, ListItem, ListItemText } from '@material-ui/core';
import gqlService from './service/graphql';

const Notification = () => {
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

    return (
        <div className="container" style={{ paddingTop: 0 }}>
            <List>
                {data.customerNotificationList.items.map((item) => (
                    <ListItem>
                        <ListItemText primary={item.subject} secondary={localDateString(item.createdAt)} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Notification;
