import { useQuery } from '@apollo/client';
import * as Schema from './schema';

export const getReview = (variables) => useQuery(Schema.getReview, {
    variables,
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'no-cache',
});

export default { getReview };
