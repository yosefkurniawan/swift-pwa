import { useQuery, useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getContactPage = (variables) => useQuery(Schema.getContactPage, { variables });

export const contactusFormSubmit = (options) => useMutation(Schema.contactusFormSubmit, { ...options });

export default { getContactPage, contactusFormSubmit };
