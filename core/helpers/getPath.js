import { basePath, graphqlEndpoint } from '@config';
import { getAppEnv } from './env';

const getPath = (href = '') => {
    let path = href;
    try {
        if (href !== '#') {
            const checkUrl = new URL(href);
            path = checkUrl.pathname.replace('.html', '');
        }
    } catch (e) {
        console.log(`${e} ${href}`);
    }

    const appEnv = getAppEnv();
    const env = appEnv === 'local' ? 'dev' : appEnv;
    let url = graphqlEndpoint[env] || 'dev';
    url = url.replace('/graphql', '');
    let path = href.replace('.html', '');
    path = path.replace(url, '');
    path = `${basePath}${path}`;
    return path;
};

export default getPath;
