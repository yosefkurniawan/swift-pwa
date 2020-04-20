/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/react-hooks';
import ConfigSchema from '../schema/config';

export default () => useQuery(ConfigSchema);
