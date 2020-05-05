import { useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';

export const requestLinkToken = () => useMutation(Schema.requestLinkToken);

export default {
    requestLinkToken,
};
