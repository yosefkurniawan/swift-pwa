import { graphqlEndpoint } from '@config';

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
    const appEnv = typeof window !== 'undefined' ? window.APP_ENV : process.env.APP_ENV;
    const env = appEnv === 'local' ? 'dev' : appEnv;
    let url = graphqlEndpoint[env] || 'dev';
    url = url.replace('/graphql', '');
    let path = href.replace('.html', '');
    path = path.replace(url, '');
    return path;
};

export default getPath;
