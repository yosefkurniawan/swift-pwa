import { gql } from 'apollo-boost';

export const setNewPassword = gql`
    mutation (
        $password: String!,
        $confirmPassword: String!,
        $token: String!
    ) {
        setNewPassword(input: { 
            password: $password, 
            password_confirmation: $confirmPassword, 
            token: $token }) {
            info
        }
    }
`;

export default {
    setNewPassword,
};
