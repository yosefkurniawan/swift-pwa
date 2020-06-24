import React from 'react';
import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import { useRouter } from 'next/router';
import { getFormDataRma } from '../services/graphql';
import Loader from './components/Loader';
import Content from './components';

const Page = (props) => {
    const { t, customerData } = props;
    const router = useRouter();
    const { id } = router.query;
    let objectData = {};
    const paramsFormRma = {
        email: customerData.email,
        order_number: id,
    };
    const { loading, data, error } = getFormDataRma(paramsFormRma);
    if (loading || !data || error) return <Loader />;
    if (!loading && data && data.getNewFormDataAwRma) {
        // eslint-disable-next-line prefer-destructuring
        objectData = data.getNewFormDataAwRma;
    }

    const pageConfig = {
        title: `${t('return:new')} ${router.query.id}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('return:new')} #${id || ''}`,
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} data={objectData} order_number={id} />
        </Layout>
    );
};

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'return'],
    withAuth: true,
});

export default withApollo({ ssr: true })(withTranslation()(Page));
