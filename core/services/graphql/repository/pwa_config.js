/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import * as Schema from '@services/graphql/schema/pwa_config';

export const vesMenuConfig = () => useQuery(Schema.vesMenuConfig);

export const popupInstallConfig = () => useQuery(Schema.popupInstallConfig);

export const shareIconConfig = () => useQuery(Schema.shareIconConfig);

export default {
    vesMenuConfig,
    popupInstallConfig,
    shareIconConfig,
};
