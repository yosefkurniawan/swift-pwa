import { useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';


export const removeToken = (token) => useMutation(Schema.removeToken, {
    context: {
        request: 'internal',
    },
    skip: !token || token === '',
});


export default { removeToken };
