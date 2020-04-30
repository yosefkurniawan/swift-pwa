import { gql } from 'apollo-boost';

export const getContactPage = gql`
    {
        cmsBlocks(identifiers: "weltpixel_contact_page") {
            items {
                identifier
                title
                content
            }
        }
    }
`;

export default { getContactPage };
