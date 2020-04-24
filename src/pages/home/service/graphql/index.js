import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getBannerSlider = () => useQuery(Schema.getBannerSlider);
export const getFeaturedProducts = (variables) => useQuery(Schema.getFeaturedProducts, { variables });
export const getCategoryList = (variables) => useQuery(Schema.getCategoryList, { variables });

export default { getCategoryList, getBannerSlider, getFeaturedProducts };
