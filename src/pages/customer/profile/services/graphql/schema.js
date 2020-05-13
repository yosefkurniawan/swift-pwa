/* eslint-disable no-tabs */
import { gql } from 'apollo-boost';

export const updateCustomer = gql`
    mutation updateCustomer($firstname: String!, $lastname: String!, $email: String!, $password: String!) {
        updateCustomer(input: { firstname: $firstname, lastname: $lastname, email: $email, password: $password }) {
            customer {
                firstname
                lastname
				email
            }
        }
    }
`;

export default { updateCustomer };
