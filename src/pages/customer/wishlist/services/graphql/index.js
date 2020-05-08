import { useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';


export const addSimpleProductsToCart = (token) => useMutation(Schema.addSimpleProductsToCart, {
    context: {
        headers: token && token !== '' ? {
            Authorization: `Bearer ${token}`,
        } : {},
    },
    skip: !token || token === '',
});


export default { addSimpleProductsToCart };
