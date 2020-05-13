import { useMutation } from '@apollo/react-hooks';
import helper from '@helpers/token';
import Schema from './schema';

const config = {
    context: {
        headers: {
            authorization: `Bearer ${helper.getToken()}`,
        },
    },
};

export const updateCustomer = (options = {}) => useMutation(Schema.updateCustomer, {
    ...options,
    ...config,
});

export default { updateCustomer };
