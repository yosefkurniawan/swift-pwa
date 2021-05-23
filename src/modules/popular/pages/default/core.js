/* eslint-disable no-param-reassign */
import Layout from '@layout';
import PopularPage from './components';
import gqlService from '../../services/graphql';

const Popular = (props) => {
    const { error, loading, data } = gqlService.getProduct();
    const {
        pageConfig,
        t,
    } = props;

    const Config = {
        title: 'Popular',
        headerTitle: 'Page Popular',
        header: 'relative', // available values: "absolute", "relative", false (default)
        bottomNav: false,
    };

    return (
        <Layout pageConfig={pageConfig || Config} {...props}>
            <PopularPage
                t={t}
                error={error}
                loading={loading}
                data={data}
            />
        </Layout>
    );
};

export default Popular;
