import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@core_modules/cms/services/graphql/schema';

export const getCmsPage = (variables) => useQuery(Schema.getCmsPage, { variables });
export const getInstagramToken = () => useLazyQuery(Schema.getInstagramToken);

// mutation
export const getInstagramFeed = () => useMutation(Schema.getInstagramFeed, {
    context: {
        request: 'internal',
    },
});

export default { getCmsPage };
