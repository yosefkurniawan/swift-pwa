import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

let fetchPolicy = 'cache-first';
fetchPolicy = 'network-only'; // comment this line to test loader/skeleton component

export const getBannerSlider = () => useQuery(Schema.getBannerSlider, {
    fetchPolicy,
});
export const getFeaturedProducts = (variables) => useQuery(Schema.getFeaturedProducts, {
    variables,
    fetchPolicy,
});
export const getCategoryList = (variables) => useQuery(Schema.getCategoryList, {
    variables,
    fetchPolicy,
});

export default { getCategoryList, getBannerSlider, getFeaturedProducts };
