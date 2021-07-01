import { features } from '@config';

const { thumbor } = features;

export const generateThumborUrl = (src = '', width = 400, height = 400) => {
    let { url } = thumbor;
    url = url.replace('width', width);
    url = url.replace('height', height);
    return url + src;
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
