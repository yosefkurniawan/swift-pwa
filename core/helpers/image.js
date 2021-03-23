import { features } from '@config';

const { thumbor } = features;

export const generateThumborUrl = (src = '', width = 400, height = 400) => {
    let { url } = thumbor;
    url = url.replace('width', width);
    url = url.replace('height', height);
    return url + src;
};

export default {
    generateThumborUrl,
};
