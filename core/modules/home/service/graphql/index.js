import { useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from '@core_modules/home/service/graphql/schema';

let fetchPolicy = '';
fetchPolicy = 'cache-first';
// uncomment this line (set 'no-cache') to test loader/skeleton component
// fetchPolicy = 'no-cache';

export const getBannerSlider = () => useQuery(Schema.getBannerSlider, {
    fetchPolicy,
});

export const getSlider = (options = {}) => useLazyQuery(Schema.getSlider, {
    fetchPolicy,
    ...options,
});

export const getFeaturedProducts = (variables, options = {}) => useLazyQuery(Schema.getFeaturedProducts, {
    variables,
    fetchPolicy,
    ...options,
});
export const getCategoryList = (variables) => useLazyQuery(Schema.getCategoryList, {
    variables,
    fetchPolicy,
});

export const getCmsPageConfig = () => useQuery(Schema.getCmsPageConfig, {
    fetchPolicy,
});

export default {
    getCategoryList, getBannerSlider, getFeaturedProducts, getSlider, getCmsPageConfig,
};
