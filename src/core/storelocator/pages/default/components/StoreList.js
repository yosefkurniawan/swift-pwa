import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

// const x = [
//     'address',
//     'baseimage',
//     'city',
//     'country_id',
//     'email',
//     'latitude',
//     'link',
//     'longitude',
//     'phone',
//     'state',
//     'store_name',
//     'storepickup_id',
//     'zipcode',
//     '__typename',
//     'lat',
//     'lng',
// ];

const StoreList = ({ storeList }) => (
    <>
        <style jsx>
            {`
                .store-list {
                    border: 2px solid #ddd;
                    padding: 12px;
                    height: calc(100% - 15px);;
                }
                h3 {
                    margin: 0;
                }
                h3 span {
                    float: right;
                }
            `}
        </style>
        <div className="store-list">
            <h3>
                Store List
                <span>{`( ${storeList.length} )`}</span>
            </h3>
            <List>
                {storeList.map((store, i) => (
                    <>
                        <ListItem key={i} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src={store.baseimage} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={store.store_name}
                                secondary={(
                                    <>
                                        {store.state}
                                        {', '}
                                        {store.city}
                                        {', '}
                                        {store.address}
                                    </>
                                )}
                            />
                        </ListItem>
                        <Divider
                            style={{ display: i === storeList.length - 1 ? 'none' : 'block' }}
                            variant="inset"
                            component="li"
                        />
                    </>
                ))}
            </List>
        </div>
    </>
);

export default StoreList;
