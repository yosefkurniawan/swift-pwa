import { gql } from 'apollo-boost';

export const localTotalCart = gql`
{
  totalCart @client
}
`;

export default {
    localTotalCart,
};
