import Error from 'next/error';
import { getResolver } from '../services/graphql';
import Category from '../pages/category';
import Product from '../pages/product';

const generateContent = (props, resolver) => {
    if (resolver.type === 'CATEGORY') {
        return <Category {...props} categoryId={resolver.id} />;
    } if (resolver.type === 'PRODUCT') {
        return <Product {...props} />;
    }
    return <Error statusCode={404} />;
};

const Content = (props) => {
    const { slug } = props;
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
    return generateContent(props, data.urlResolver ? data.urlResolver : {});
};

export default Content;
