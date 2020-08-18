/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/react-hooks';
import schema from './schema';

export const getCategories = () => useQuery(schema.categories);
