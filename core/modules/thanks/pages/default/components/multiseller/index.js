/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { useApolloClient } from '@apollo/client';
import ErrorInfo from '@core_modules/thanks/pages/default/components/ErrorInfo';
import Loader from '@core_modules/thanks/pages/default/components/Loader';
import Content from '@core_modules/thanks/pages/default/components/multiseller/view';
import * as Schema from '@core_modules/thanks/services/graphql/schema';
import { getCheckoutData, removeCheckoutData } from '@helper_cookies';
import Layout from '@layout';
import Router from 'next/router';
import propTypes from 'prop-types';
import * as React from 'react';

const CoreMultiseller = (props) => {
    const {
        t, pageConfig, checkoutData, storeConfig, ...other
    } = props;

    const apolloClient = useApolloClient();

    const config = {
        title: t('thanks:title'),
        headerTitle: t('thanks:title'),
        bottomNav: false,
        pageType: 'purchase',
        ...pageConfig,
    };

    const [customerOrder, setCustomerOrder] = React.useState([]);
    const [loader, setLoader] = React.useState(true);

    const getCustomerOrder = (order_number) => new Promise((resolve, reject) => {
        try {
            apolloClient
                .query({
                    query: Schema.getCustomerOrder,
                    variables: { order_number },
                    context: {
                        request: 'internal',
                    },
                    errorPolicy: 'all',
                })
                .then(({ data }) => {
                    const orderDataInfo = {
                        order_number,
                        seller_id: data.customer.orders.items[0].detail[1].items[0].seller_id,
                        seller_name: data.customer.orders.items[0].detail[1].items[0].seller_name,
                    };
                    resolve(orderDataInfo);
                })
                .catch((e) => {
                    reject(e);
                });
        } catch (e) {
            reject(e);
        }
    });

    React.useEffect(() => {
        const parsedCheckoutData = checkoutData;
        const orderNumberCollection = parsedCheckoutData.order_number.split('+');

        if (orderNumberCollection && orderNumberCollection.length > 0 && typeof window !== 'undefined') {
            let count = 1;
            const getData = [];
            for (let key = 0; key < orderNumberCollection.length; key += 1) {
                const order = orderNumberCollection[key];
                getData.push(getCustomerOrder(order));
                count += 1;
            }
            Promise.all(getData).then((res) => {
                setCustomerOrder(res);
            });
            if (count === orderNumberCollection.length) {
                setTimeout(() => {
                    setLoader(false);
                }, 2000);
            }
        } else {
            setLoader(false);
        }
    }, [checkoutData]);

    if (!loader && (!customerOrder || customerOrder.length === 0)) {
        return (
            <Layout t={t} {...other} pageConfig={config} storeConfig={storeConfig}>
                <ErrorInfo variant="warning" text={t('common:error:notFound')} />
            </Layout>
        );
    }

    const deleteCheckoutData = () => {
        const cdt = getCheckoutData();
        if (cdt) removeCheckoutData();
    };

    const handleContinue = () => {
        deleteCheckoutData();
        Router.push('/');
    };

    if (customerOrder && customerOrder.length > 0) {
        return (
            <Layout t={t} {...other} pageConfig={config} storeConfig={storeConfig} showRecentlyBar={false}>
                <Content
                    {...other}
                    t={t}
                    checkoutData={checkoutData}
                    storeConfig={storeConfig}
                    customerOrder={customerOrder}
                    handleContinue={handleContinue}
                />
            </Layout>
        );
    }

    return (
        <Layout t={t} {...other} pageConfig={config} storeConfig={storeConfig}>
            <Loader />
        </Layout>
    );
};

CoreMultiseller.propTypes = {
    storeConfig: propTypes.object.isRequired,
    checkoutData: propTypes.object.isRequired,
    t: propTypes.func.isRequired,
};

export default CoreMultiseller;
