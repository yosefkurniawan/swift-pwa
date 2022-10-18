/* eslint-disable arrow-body-style */

export const generateThumborUrl = (src = '', width = 400, height = 400, enable, useHttpsOrHttp, url) => {
    if (enable) {
        if (typeof window !== 'undefined' && navigator && navigator?.appVersion) {
            const userAgent = navigator.appVersion;
            const regex = (/iPhone|iPad|iPod/i);
            const isIOS = regex.test(userAgent);
            if (isIOS) {
                const version = userAgent.match(/\b[0-9]+_[0-9]+(?:_[0-9]+)?\b/)[0];
                const majorVersion = version.split('_')[0];
                // webp is not supported on IOS version 14 and below
                if (majorVersion < 14) {
                    return src;
                }
            }
        }

        if (url) {
            let source = src;
            let newurl = url;
            if (!useHttpsOrHttp) {
                if (source.includes('http')) {
                    source = source.replace('http://', '');
                }
                if (source.includes('https')) {
                    source = source.replace('https://', '');
                }
            }
            newurl = newurl.replace('width', width);
            newurl = newurl.replace('height', height);
            return newurl + source;
        }

        return src;
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
