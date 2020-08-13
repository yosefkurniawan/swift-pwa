import { useMutation, useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const contactusFormSubmit = (options) => useMutation(Schema.contactusFormSubmit, { ...options });
export const getCmsBlocks = (variables) => useQuery(Schema.getCmsBlocks, { variables });

export default { contactusFormSubmit, getCmsBlocks };
