import propTypes from 'prop-types';
import { customerNotificationList } from '../../services/graphql';
import Content from './components';

const NotificationsBell = ({ withLink }) => {
    const { data } = customerNotificationList();
    const totalUnread = data
        && data.customerNotificationList
        && data.customerNotificationList.totalUnread;
    return (
        <Content withLink={withLink} totalUnread={totalUnread} />
    );
};

NotificationsBell.propTypes = {
    withLink: propTypes.bool.isRequired,
};

export default NotificationsBell;
