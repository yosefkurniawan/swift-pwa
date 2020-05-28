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

export default { readNotification };
