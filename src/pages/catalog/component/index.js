import Error from 'next/error';
import { getResolver } from '../services/graphql';

const generateContent = (resolver) => {
    if (resolver.type === 'CATEGORY') {
        return <div>ini halaman category</div>;
    } if (resolver.type === 'PRODUCT') {
        return <div>ini halaman product</div>;
    }
    return <Error statusCode={404} />;
};

const Content = ({ slug }) => {
    let url = '';
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < slug.length; index++) {
        url += `/${slug[index]}`;
    }
    url += '.html';

    const { loading, data } = getResolver(url);
    if (loading) {
        return <span />;
    }

    return generateContent(data.urlResolver ? data.urlResolver : {});
};

export default Content;
