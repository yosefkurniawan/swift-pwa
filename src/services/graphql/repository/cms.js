import { useQuery } from '@apollo/react-hooks';
import * as Schema from '../schema/cms';

export const getCmsBlocks = (variables) => useQuery(Schema.getCmsBlocks, { variables });

export default { getCmsBlocks };
