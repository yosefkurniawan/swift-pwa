/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getCartData = (cartId) => useQuery(Schema.getCart, { variables: { cartId } });
