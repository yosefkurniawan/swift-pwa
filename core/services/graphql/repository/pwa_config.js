/* eslint-disable import/prefer-default-export */
import { useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from '@services/graphql/schema/pwa_config';

export const vesMenuConfig = () => useQuery(Schema.vesMenuConfig);

export const popupInstallConfig = () => useQuery(Schema.popupInstallConfig);

export const shareIconConfig = () => useQuery(Schema.shareIconConfig);

export const contactConfig = () => useQuery(Schema.contactConfig);

export const popupDetailImagePdp = () => useLazyQuery(Schema.popupDetailImagePdp);

export const pageSizeConfig = () => useQuery(Schema.pageSizeConfig);

export const drawerFilterOnDesktopConfig = () => useQuery(Schema.drawerFilterOnDesktopConfig);

export const labelConfig = () => useQuery(Schema.labelConfig);

export const configurableOptionsConfig = () => useQuery(Schema.configurableOptionsConfig);

export const ratingConfig = () => useQuery(Schema.ratingConfig);

export const addToCartConfig = () => useQuery(Schema.addToCartConfig);

export const quickViewConfig = () => useQuery(Schema.quickViewConfig);

export default {
    vesMenuConfig,
    popupInstallConfig,
    shareIconConfig,
    contactConfig,
    popupDetailImagePdp,
    pageSizeConfig,
    drawerFilterOnDesktopConfig,
    labelConfig,
    configurableOptionsConfig,
    ratingConfig,
    addToCartConfig,
    quickViewConfig,
};
