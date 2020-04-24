import { gql } from 'apollo-boost';

export const addReview = gql`
mutation createReview(
    $nickname: String!,
    $rating: Int!,
    $title: String!,
    $detail: String!,
    $pkValue: Int!

) {
    addProductReview(input: {
      entity_pk_value: $pkValue,
      title: $title,
      detail: $detail,
      nickname: $nickname,
      ratings: {
        rating_name: "Rating",
        value: $rating
      }
    }){
      message
    }
  }
`;

export const getReview = (params) => {
    const { sku, pageSize, currentPage } = params;
    const query = gql`
  {
    getProductReviews(sku: "${sku}", pageSize:${pageSize}, currentPage:${currentPage}) {
      items {
        id
        nickname
        ratings {
          rating_name
          value
        }
        entity_pk_value
        review_entity
        review_type
        review_status
        title
        detail
        created_at
      }
      message
      totalCount
    }
  }
  `;
    return query;
};


export default {
    addReview,
};
