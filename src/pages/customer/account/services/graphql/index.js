import { useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';


export const removeToken = (token) => useMutation(Schema.removeToken, {
    context: {
        headers: token && token !== '' ? {
            Authorization: `Bearer ${token}`,
        } : {},
    },
    skip: !token || token === '',
});


export default { removeToken };
