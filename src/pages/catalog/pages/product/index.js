import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Error from 'next/error';
import Loading from './components/Loader';
import { getProduct } from './services/graphql';
import Content from './components';
import CustomHeader from './components/header';

const Page = (props) => {
    let product = {};
    const { slug } = props;
    const { loading, data, error } = getProduct(slug[0]);
    if (loading || !data) return <Loading />;
    if (data) {
        product = data.products;
        if (product.items.length === 0) return <Error statusCode={404} />;
    }
    if (error) return <Loading />;
    const pageConfig = {
        title: product.items.length > 1 ? product.items[0].name : '',
        bottomNav: false,
        header: 'absolute', // available values: "absolute", "relative", false (default)
        pageType: 'product',
    };
    return (
        <Layout pageConfig={pageConfig} CustomHeader={<CustomHeader />}>
            <Content {...props} data={product.items[0]} />
        </Layout>
    );
};

export default withTranslation()(Page);
