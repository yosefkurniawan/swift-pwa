/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

export const strToCSSObject = (string) => {
    const css_json = `{"${string.replace(/; /g, '", "').replace(/: /g, '": "').replace(';', '')}"}`;

    const obj = JSON.parse(css_json);

    const keyValues = Object.keys(obj).map((key) => {
        const camelCased = key.replace(/-[a-z]/g, (g) => g[1].toUpperCase());
        return { [camelCased]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
};

export const StripHtmlTags = (str = '') => {
    if ((str === null) || (str === '')) return false;
    str = str.toString();
    return str.replace(/<[^>]*>/g, '');
};

// eslint-disable-next-line max-len
export const capitalizeEachWord = (str = '') => str.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
