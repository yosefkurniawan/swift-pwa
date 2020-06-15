import React from 'react';
import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';
import { custDataNameCookie } from '@config';
import { getFormDataRma } from '../services/graphql';
import Loader from './components/Loader';
import Content from './components';

const Page = (props) => {
    const { t, customer } = props;
    const router = useRouter();
    const { id } = router.query;
    let objectData = {};
    const paramsFormRma = {
        email: customer.email,
        order_number: id,
        type: 'new',
    };
    const { loading, data, error } = getFormDataRma(paramsFormRma);
    if (loading || !data || error) return <Loader />;
    if (!loading && data && data.getFormDataAwRma) {
        // eslint-disable-next-line prefer-destructuring
        objectData = data.getFormDataAwRma;
    }

    const pageConfig = {
        title: `${t('return:new')} ${router.query.id}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('return:new')} #${id || ''}`,
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} data={objectData} />
        </Layout>
    );
};

Page.getInitialProps = async (ctx) => {
    const custData = cookies(ctx);
    return {
        namespacesRequired: ['common', 'return'],
        customer: custData[custDataNameCookie],
        withAuth: true,
    };
};

export default withTranslation()(Page);
