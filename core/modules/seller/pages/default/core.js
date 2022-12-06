/* eslint-disable object-curly-newline */
// import { getProduct } from '@core_modules/catalog/services/graphql';
import { getSeller } from '@core_modules/seller/services/graphql';
import { getHost } from '@helper_config';
import Layout from '@layout';
import { useRouter } from 'next/router';
import React from 'react';

const Seller = (props) => {
    const { t, storeConfig, pageConfig, Content, ...other } = props;
    const router = useRouter();

    const { data, error, loading } = getSeller({
        variables: {
            sellerId: parseInt(router.query.sellerId, 10),
        },
    });

    const config = {
        title: data && data.getSeller.length > 0 && data.getSeller[0].name ? data.getSeller[0].name : 'Seller Page', // t('forgotpassword:title')
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: data && data.getSeller.length > 0 && data.getSeller[0].name ? data.getSeller[0].name : 'Seller Page', // t('forgotpassword:title')
        bottomNav: true,
        customFilter: false,
        search: '',
        pageSize: 8,
        currentPage: 1,
        filter: [],
        ...storeConfig.pwa,
    };

    const link = getHost() + router.asPath;

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content
                t={t}
                storeConfig={storeConfig}
                data={data}
                error={error}
                loading={loading}
                link={link}
                sellerId={router.query.sellerId}
                {...other}
            />
        </Layout>
    );
};

export default Seller;
