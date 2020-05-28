import Error from 'next/error';
import { cmsPages } from '@root/swift.config.js';
import { getResolver } from '../services/graphql';
import Category from '../pages/category';
import Product from '../pages/product';
import Cms from '../pages/cms';

const generateContent = (props, resolver) => {
    if (resolver.type === 'CATEGORY') {
        return <Category {...props} categoryId={resolver.id} />;
    }
    if (resolver.type === 'PRODUCT') {
        return <Product {...props} />;
    }
    if (resolver.type === 'CMS_PAGE') {
        return <Cms {...props} />;
    }
    return <Error statusCode={404} />;
};

const GetResolver = (props) => {
    const { url } = props;
    const { error, loading, data } = getResolver(url);
    if (error) return <Error statusCode={500} />;
    if (loading) return <span />;
    return generateContent(props, data.urlResolver ? data.urlResolver : {});
};

const Content = (props) => {
    const { slug, storeConfig } = props;
    let url = slug.join('/');

    // suffix based on storeConfig
    const suffix = (storeConfig || {}).category_url_suffix || '';

    // for cms pages, no need to add suffix
    url += cmsPages.find((cmsPage) => cmsPage === url) ? '' : suffix;
    return <GetResolver {...props} url={url} />;
};

export default Content;
