import Error from 'next/error';
import { cmsPages } from '@root/swift.config.js';
import { getResolver } from '../services/graphql';
import Category from '../pages/category';
import Product from '../pages/product';

const generateContent = (props, resolver) => {
    if (resolver.type === 'CATEGORY') {
        return <Category {...props} categoryId={resolver.id} />;
    }
    if (resolver.type === 'PRODUCT') {
        return <Product {...props} />;
    }
    if (resolver.type === 'CMS_PAGE') {
        return <div>About-us</div>;
    }
    return <Error statusCode={404} />;
};

const Content = (props) => {
    const { slug } = props;
    let url = slug.join('/');
    url += cmsPages.find((cmsPage) => cmsPage === url) ? '' : '.html';

    const { loading, data } = getResolver(url);
    if (loading) {
        return <span />;
    }

    return generateContent(props, data.urlResolver ? data.urlResolver : {});
};

export default Content;
