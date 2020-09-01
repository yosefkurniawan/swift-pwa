const getPath = (href = '') => {
    if (href && href !== '' && typeof window !== 'undefined') {
        const link = document.createElement('a');
        link.href = href;
        let path = link.pathname;
        if (path.includes('.html')) {
            path = path.split('.html');
            // eslint-disable-next-line prefer-destructuring
            path = path[0];
        }
        return path;
    }
    return '';
};

export default getPath;
