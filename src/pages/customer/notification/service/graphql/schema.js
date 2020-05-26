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

const readNotification = gql`
    mutation readNotification (
        $entityId: Int!
    ) {
        readNotification(
            entityId: $entityId
        ) {
            ${notificationOutput}
        }  
    }
`;

export default { customerNotificationList, readNotification };
