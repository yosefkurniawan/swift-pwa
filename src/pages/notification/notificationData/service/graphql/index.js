import { useMutation } from '@apollo/react-hooks';
import Schema from './schema';

export const readNotification = (options = {}) => useMutation(Schema.readNotification, {
    ...options,
    context: {
        request: 'internal',
    },
});

export default { readNotification };
