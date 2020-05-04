import { useQuery, useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getContactPage = (variables) => useQuery(Schema.getContactPage, { variables });

export const contactusFormSubmit = (variables) => useMutation(Schema.contactusFormSubmit, { variables });

export default { getContactPage, contactusFormSubmit };
