import { useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';


export const removeToken = () => useMutation(Schema.removeToken, {
    context: {
        request: 'internal',
    },
});


export default { removeToken };
