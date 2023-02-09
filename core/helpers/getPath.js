const getPath = (href = '') => {
    const checkUrl = new URL(href);
    const path = checkUrl.pathname.replace('.html', '');
    return path;
};

export default getPath;
