import { useMutation } from '@apollo/react-hooks';
import * as Schema from './schema';

export const newPassword = () => useMutation(Schema.setNewPassword);

export default {
    newPassword,
};
