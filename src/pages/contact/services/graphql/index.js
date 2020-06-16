import { useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';

export const contactusFormSubmit = (options) => useMutation(Schema.contactusFormSubmit, { ...options });

export default { contactusFormSubmit };
