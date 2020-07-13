/* eslint-disable no-tabs */
import { gql } from 'apollo-boost';

export const updateCustomer = gql`
    mutation updateCustomer(
        $firstname: String!,
        $lastname: String!,
        $email: String!,
        $password: String!
        $whatsapp_number: String,
        $phonenumber: String,
    ) {
        updateCustomerCustom(
            input: {
                firstname: $firstname,
                lastname: $lastname,
                email: $email,
                password: $password,
                whatsapp_number: $whatsapp_number,
                phonenumber: $phonenumber,
            }
        ) {
            customer {
                firstname
                lastname
				email
            }
        }
    }
`;

export const changeCustomerPassword = gql`
    mutation changeCustomerPassword($currentPassword: String!, $newPassword: String!) {
        changeCustomerPassword(currentPassword: $currentPassword, newPassword: $newPassword) {
            firstname
            lastname
            email
        }
    }
`;

export default { updateCustomer, changeCustomerPassword };
