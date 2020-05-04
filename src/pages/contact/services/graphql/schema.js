import { gql } from 'apollo-boost';

export const getContactPage = gql`
    query($identifiers: [String]) {
        cmsBlocks(identifiers: $identifiers) {
            items {
                identifier
                title
                content
            }
        }
    }
`;

export const contactusFormSubmit = gql`
    mutation contactusFormSubmit($email: String!, $fullname: String!, $message: String!, $telephone: String) {
        contactusFormSubmit(input: { email: $email, fullname: $fullname, message: $message, telephone: $telephone }) {
            success_message
        }
    }
`;

export default { getContactPage, contactusFormSubmit };
