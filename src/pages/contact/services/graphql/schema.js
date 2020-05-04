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

export default { getContactPage };
