import { useMutation, useQuery } from '@apollo/react-hooks';
import Schema from './schema';

export const customerNotificationList = () => useQuery(Schema.customerNotificationList, {
    context: {
        request: 'internal',
    },
});

export const readNotification = (options = {}) => useMutation(Schema.readNotification, {
    ...options,
    context: {
        request: 'internal',
    },
});

export default { customerNotificationList, readNotification };
