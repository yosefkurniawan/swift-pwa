import { useQuery, useMutation } from '@apollo/react-hooks';
import Schema from './schema';

export const removeToken = () => useMutation(Schema.removeToken, {
    context: {
        request: 'internal',
    },
});

export const customerNotificationList = () => useQuery(Schema.customerNotificationList, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'network-only',
});

export default { removeToken, customerNotificationList };
