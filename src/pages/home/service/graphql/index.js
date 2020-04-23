import { useQuery } from '@apollo/react-hooks';
import * as Schema from './schema';

export const getBannerSlider = () => useQuery(Schema.getBannerSlider);
export const getCategoryList = (variables) => useQuery(Schema.getCategoryList, { variables });

export default { getCategoryList, getBannerSlider };
