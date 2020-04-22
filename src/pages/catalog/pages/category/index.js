import { withTranslation } from '@i18n';
import Layout from '@components/Layouts';
import PropTypes from 'prop-types';
import Loading from '@components/Loaders';
import Component from './components';
import { getCategory } from './services';

const Page = (props) => {
    const { categoryId } = props;
    const { loading, data } = getCategory({
        productSize: 20,
        id: categoryId,
    });

    if (loading) {
        return <Loading />;
    }
    const pageConfig = {
        title: data.categoryList[0].name,
        header: 'absolute', // available values: "absolute", "relative", false (default)
        bottomNav: 'browse',
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Component {...props} data={data} />
        </Layout>
    );
};

Page.propTypes = {
    categoryId: PropTypes.number.isRequired,
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'category'],
});

// export async function getServerSideProps() {

// @TODO: get category data by id then provide the data into props

// return {
//     props: {
//         // ...
//     }
// };
// }

export default withTranslation()(Page);
