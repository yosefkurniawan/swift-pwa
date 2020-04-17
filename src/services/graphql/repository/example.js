/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/react-hooks';
import * as ExampleSchema from '../schema/example';

export const getCategories = () => useQuery(ExampleSchema.categories);
