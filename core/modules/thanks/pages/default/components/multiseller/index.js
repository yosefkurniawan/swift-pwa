/* eslint-disable react/forbid-prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { useApolloClient } from '@apollo/client';
import { debuging } from '@config';
import ErrorInfo from '@core_modules/thanks/pages/default/components/ErrorInfo';
import Skeleton from '@core_modules/thanks/pages/default/components/Loader';
import ContentMultiseller from '@core_modules/thanks/pages/default/components/multiseller/components';
import { getOrder, getPaymentBankList, getPaymentInformation } from '@core_modules/thanks/services/graphql';
import * as Schema from '@core_modules/thanks/services/graphql/schema';
import { getCheckoutData, removeCheckoutData } from '@helper_cookies';
import Layout from '@layout';
import Router from 'next/router';
import propTypes from 'prop-types';
import * as React from 'react';
import TagManager from 'react-gtm-module';

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

    const checkoutDataCollection = [];
    console.log(checkoutData);
    const parsedCheckoutData = checkoutData;
    const orderNumberCollection = parsedCheckoutData.order_number.split('+');
    const [customerOrder, setCustomerOrder] = React.useState(null);
    const [customerOrderCollection, setCustomerOrderCollection] = React.useState([]);
    const [loadingStateThankyou, setLoadingStateThankyou] = React.useState(true);

    orderNumberCollection.forEach((order) => {
        checkoutDataCollection.push({
            email: parsedCheckoutData.email,
            order_id: order,
            order_number: order,
        });
    });

    console.log(checkoutDataCollection);

    React.useEffect(() => {
        const getCustomerOrder = (order_number) => {
            return new Promise((resolve, reject) => {
                try {
                    apolloClient
                        .query({
                            query: Schema.getCustomerOrder,
                            variables: { order_number },
                            context: {
                                request: 'internal',
                            },
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
        };

        if (checkoutDataCollection.length === orderNumberCollection.length) {
            if (customerOrder === null) {
                const tempArray = [];
                checkoutDataCollection.forEach(async (order) => {
                    const orderData = await getCustomerOrder(order.order_number);
                    if (orderData && orderData.order_number) {
                        tempArray.push(orderData);
                        console.log(orderData.order_number);
                        // setCustomerOrder((prev) => ({ ...prev, ...orderData }));
                    }
                });
                setCustomerOrder(tempArray);
            }
        }
    }, [customerOrder]);

    console.log(customerOrder);

    return (
        // <ErrorInfo variant="warning" text={t('common:error:notFound')} />
        <>
            {customerOrder && customerOrder.length > 0 && (
                <p>Halo</p>
            )}
        </>
    );
};

CoreMultiseller.propTypes = {
    pageConfig: propTypes.array.isRequired,
    storeConfig: propTypes.array.isRequired,
    checkoutData: propTypes.object.isRequired,
};

export default CoreMultiseller;
