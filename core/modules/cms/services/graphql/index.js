import { useQuery } from '@apollo/client';
import * as Schema from '@core_modules/cms/services/graphql/schema';

export const getCmsPage = (variables) => useQuery(Schema.getCmsPage, { variables });

export default { getCmsPage };
