import { useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';

export const register = () => useMutation(Schema.register, {
    context: {
        request: 'internal',
    },
});

export default {
    register,
};
