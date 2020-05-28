import { useQuery } from '@apollo/react-hooks';
import Schema from './schema';

export const customerNotificationList = () => useQuery(Schema.customerNotificationList, {
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export default { customerNotificationList };
