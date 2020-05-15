import { useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';


export const addSimpleProductsToCart = () => useMutation(Schema.addSimpleProductsToCart, {
    context: {
        request: 'internal',
    },
});


export default { addSimpleProductsToCart };
