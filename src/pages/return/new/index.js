import React from 'react';
import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';
import { custDataNameCookie } from '@config';
import { getOrderDetail, getFormDataRma } from '../services/graphql';
import Loader from './components/Loader';
import Content from './components';

const Page = (props) => {
    const { t, customer } = props;
    const router = useRouter();
    const { id } = router.query;
    const objectData = {
        detail: [],
        form: [],
    };
    const [params] = React.useState({
        order_id: id,
    });
    const paramsFormRma = {
        email: customer.email,
        order_number: id,
        type: 'new',
    };
    const { loading, data, error } = getOrderDetail(params);
    const formRma = getFormDataRma(paramsFormRma);
    if (loading || !data || error || formRma.loading || !formRma.data) return <Loader />;
    if (!loading && data && data.customerOrders) {
        // eslint-disable-next-line prefer-destructuring
        if (data.customerOrders.items[0].status !== 'complete') router.back();
        else objectData.detail = data.customerOrders.items;
    }
    if (!formRma.loading && formRma.data && formRma.data.getFormDataAwRma) {
        objectData.form = formRma.data.getFormDataAwRma.custom_field;
    }
    const currency = objectData.detail.length > 0 ? objectData.detail[0].detail[0].global_currency_code : 'USD';

    const pageConfig = {
        title: `${t('return:new')} ${router.query.id}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('return:new')} #${objectData.detail.length > 0 ? objectData.detail[0].order_number : ''}`,
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} data={objectData} currency={currency} />
        </Layout>
    );
};

Page.getInitialProps = async (ctx) => {
    const custData = cookies(ctx);
    return {
        namespacesRequired: ['common', 'return'],
        customer: custData[custDataNameCookie],
    };
};

export default withTranslation()(Page);
