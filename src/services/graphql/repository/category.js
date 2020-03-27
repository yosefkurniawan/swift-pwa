import { useQuery } from "@apollo/react-hooks";
import * as CategorySchema from '../schema/category';

export const getCategories = () => {
    return useQuery(CategorySchema.categories);
};