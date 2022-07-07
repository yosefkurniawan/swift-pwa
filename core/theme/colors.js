import { getLocalStorage } from '@helper_localstorage';

const pwaConfig = getLocalStorage('storeConfig');

export const PRIMARY = pwaConfig && pwaConfig.pwa && pwaConfig.pwa.primary_color ? pwaConfig.pwa.primary_color : '#000000';
export const SECONDARY = pwaConfig && pwaConfig.pwa && pwaConfig.pwa.secondary_color ? pwaConfig.pwa.secondary_color : '#818181';

export const GRAY_PRIMARY = '#DEDEDE';
export const GRAY_SECONDARY = '#B4B4B4';
export const GRAY_THIRD = '#6E6E6E';
export const GRAY_LIGHT = '#F8F8F8';
export const WHITE = pwaConfig && pwaConfig.pwa && pwaConfig.pwa.background_color ? pwaConfig.pwa.background_color : '#FFFFFF';
export const WHITE_IMPORTANT = '#FFFFFF !important';

export const RED = pwaConfig && pwaConfig.pwa && pwaConfig.pwa.error_color ? pwaConfig.pwa.error_color : '#ff0000';
export const ORANGE = pwaConfig && pwaConfig.pwa && pwaConfig.pwa.warning_msg_color ? pwaConfig.pwa.warning_msg_color : '#FE5D26';
export const GREEN = pwaConfig && pwaConfig.pwa && pwaConfig.pwa.success_msg_color ? pwaConfig.pwa.success_msg_color : '#46954D';
export const BLACK = '#000000';
