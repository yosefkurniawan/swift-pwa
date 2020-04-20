import { withTranslation } from '@i18n';
import Layout from '@components/Layouts';
import Component from './components';

const Page = (props) => {
    const pageConfig = {
        title: '[Category Name]',
        header: 'absolute', // available values: "absolute", "relative", false (default)
        bottomNav: 'browse',
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Component {...props} />
        </Layout>
    );
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
