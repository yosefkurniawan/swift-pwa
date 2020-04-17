/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/react-hooks';
import * as CategorySchema from '../schema/category';

export const getCategories = () => useQuery(CategorySchema.categories);
