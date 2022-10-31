/* eslint-disable arrow-body-style */

import { features } from '@config';

const { thumbor } = features;

export const generateThumborUrl = (src = '', width = 400, height = 400) => {
    const { enable, useHttpsOrHttp } = thumbor;
    let { url } = thumbor;
    if (enable) {
        if (typeof window !== 'undefined' && navigator && navigator?.appVersion) {
            const userAgent = navigator.appVersion;
            const regex = (/iPhone|iPad|iPod|Mac/i);
            const isIOS = regex.test(userAgent);
            const newRegex = (/Version/i);
            const isSafari = newRegex.test(userAgent);
            if (isIOS) {
                const version = userAgent.match(/\b[0-9]+_[0-9]+(?:_[0-9]+)?\b/)[0];
                const majorVersion = version.split('_')[0];
                // webp is not supported on IOS version 14 and below

                if (isSafari) {
                    let versionSavari = userAgent.split('Version/');
                    if (versionSavari && versionSavari.length > 0) {
                        versionSavari = versionSavari[1].split(' ');
                        if (versionSavari && versionSavari.length > 0 && versionSavari[0] < 14) {
                            return src;
                        }
                    }
                } else if (majorVersion < 14) {
                    return src;
                }
            }
        }
        let source = src;
        if (!useHttpsOrHttp) {
            if (source.includes('http')) {
                source = source.replace('http://', '');
            }
            if (source.includes('https')) {
                source = source.replace('https://', '');
            }
        }
        url = url.replace('width', width);
        url = url.replace('height', height);
        return url + source;
    }

    return src;
};

export const getImageFallbackUrl = (src) => {
    return src.replace('webp', 'jpeg');
};

export const generateImageDimensions = (url = '') => {
    const imgDimension = {
        height: 500,
        width: 500,
    };

    if (url !== '') {
        const image = new Image();
        image.src = url;

        imgDimension.width = image.naturalWidth;
        imgDimension.height = image.naturalHeight;
    }

    return imgDimension;
};

export default {
    generateThumborUrl,
    generateImageDimensions,
};
