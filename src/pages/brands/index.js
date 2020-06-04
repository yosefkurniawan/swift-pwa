import Layout from '@components/Layouts';
import Content from './component';

const BrandsPage = (props) => {
    const pageConfig = {
        title: 'Brands',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: 'Brands',
        headerBackIcon: 'arrow', // available values: "close", "arrow"
        bottomNav: false,
        pageType: 'brands',
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} />
        </Layout>
    );
};

export default BrandsPage;
