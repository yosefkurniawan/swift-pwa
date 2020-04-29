import Error from 'next/error';
import { cmsPages } from '@root/swift.config.js';
import Loading from '@components/Loaders';
import { getResolver, getStoreConfig } from '../services/graphql';
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
    if (error) return <p>error</p>;
    if (loading) return <Loading size="50px" />;
    return generateContent(props, data.urlResolver ? data.urlResolver : {});
};

const Content = (props) => {
    const { slug } = props;
    let url = slug.join('/');
    const { error, loading, data } = getStoreConfig();
    if (error) return <p>error</p>;
    if (loading) return <Loading size="50px" />;

    // suffix based on storeConfig
    const suffix = data.storeConfig.category_url_suffix || '';

    // for cms pages, no need to add suffix
    url += cmsPages.find((cmsPage) => cmsPage === url) ? '' : suffix;

    return <GetResolver {...props} url={url} />;
};

export default Content;
