/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/react-hooks';
import * as Schema from '../schema/config';

export const storeConfig = () => useQuery(Schema.storeConfig);
export const otpConfig = () => useQuery(Schema.otpConfig);
export default {
    storeConfig,
    otpConfig,
};
