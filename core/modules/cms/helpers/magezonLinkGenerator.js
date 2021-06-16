export const getLink = (link = '') => {
    const identifier = '{{mgzlink ';
    if (link.includes(identifier)) {
        let splitLink = link.replace(identifier, '<pwalink ');
        splitLink = splitLink.replace('}}', '/>');
        return splitLink;
    }

    return link;
};

export default {
    getLink,
};
