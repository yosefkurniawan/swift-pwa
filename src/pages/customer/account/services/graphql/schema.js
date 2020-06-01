import { gql } from 'apollo-boost';

export const removeToken = gql`
mutation {
  internalDeleteCustomerToken{
    result
  }
}
`;

export const customerNotificationList = gql`
    query customerNotificationList {
        customerNotificationList {
          totalUnread
        }
    }
`;

export default { removeToken, customerNotificationList };
