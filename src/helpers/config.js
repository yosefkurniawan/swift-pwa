/* eslint-disable import/prefer-default-export */
import { HOST } from '@config';

const isProduction = process.env.NODE_ENV === 'production';

export const getHost = () => (isProduction ? HOST.prod : HOST.dev);
