import { useMutation, useQuery } from '@apollo/client';
import * as Schema from '@core_modules/contact/services/graphql/schema';

export const contactusFormSubmit = (options) => useMutation(Schema.contactusFormSubmit, {
    ...options,
    context: {
        request: 'internal',
    },
});
export const getCmsBlocks = (variables) => useQuery(Schema.getCmsBlocks, {
    variables,
    context: {
        request: 'internal',
    },
    fetchPolicy: 'network-only',
});

export default { contactusFormSubmit, getCmsBlocks };
