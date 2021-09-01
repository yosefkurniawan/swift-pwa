/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import * as Schema from '@services/graphql/schema/pwa_config';

export const popupInstallConfig = () => useQuery(Schema.popupInstallConfig);

export default {
    popupInstallConfig,
};
