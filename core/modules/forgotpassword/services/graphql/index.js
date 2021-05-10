import { useMutation, useQuery } from '@apollo/client';
import * as Schema from '@core_modules/forgotpassword/services/graphql/schema';

export const requestLinkToken = () => useMutation(Schema.requestLinkToken);
export const otpConfig = () => useQuery(Schema.otpConfig);

export default {
    requestLinkToken,
};
