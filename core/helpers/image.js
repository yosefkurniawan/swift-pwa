/* eslint-disable arrow-body-style */

export const generateThumborUrl = (src = '', width = 400, height = 400, enable, useHttpsOrHttp, url) => {
    if (enable) {
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
