import { gql } from 'apollo-boost';

const notificationOutput = `
    items {
        entityId
        subject
        createdAt
        unread
        content
    }
    totalUnread
`;

const customerNotificationList = gql`
    query customerNotificationList {
        customerNotificationList {
            ${notificationOutput}
        }
    }
`;

export default { customerNotificationList };
