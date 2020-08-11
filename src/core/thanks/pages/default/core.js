/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import Layout from '@layout';
import TagManager from 'react-gtm-module';
import { removeCheckoutData, getCheckoutData } from '@helpers/cookies';
import Router from 'next/router';
import { debuging } from '@config';
import { getOrder } from '../../services/graphql';

const PageStoreCredit = (props) => {
    const {
        t, Content, pageConfig, checkoutData, storeConfig, Skeleton, ErrorInfo,
    } = props;
    const config = {
        title: t('thanks:title'),
        headerTitle: t('thanks:title'),
        bottomNav: false,
        pageType: 'purchase',
        ...pageConfig,
    };
    let ordersFilter = {
        data: [],
    };
    const { data, loading, error } = getOrder(checkoutData);
    if (loading || !data) return <Skeleton />;
    if (error) {
        return (
            <ErrorInfo variant="error" text={debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')} />
        );
    }
    if (data && data.ordersFilter) ordersFilter = data.ordersFilter;
    const handleCotinue = () => {
        const cdt = getCheckoutData();
        if (cdt) removeCheckoutData();
        Router.push('/');
    };

    React.useEffect(() => {
        if (ordersFilter.data.length > 0) {
            let itemsProduct = [];
            const itemsChild = ordersFilter.data[0].detail[0].items.filter((item) => {
                if (item.parent_item_id !== null) return item;
            });
            const simpleData = ordersFilter.data[0].detail[0].items.filter((item) => !itemsChild.find(({ sku }) => item.sku === sku) && item);
            itemsProduct = [...itemsChild, ...simpleData];
            const dataLayer = {
                pageType: 'purchase',
                event: 'checkout',
                ecommerce: {
                    purchase: {
                        actionField: {
                            id: checkoutData.order_number,
                            affiliation: storeConfig.store_name || 'Swift PWA',
                            revenue: JSON.stringify(ordersFilter.data[0].detail[0].grand_total),
                            coupon: ordersFilter.data[0].detail[0].coupon.is_use_coupon ? ordersFilter.data[0].detail[0].coupon.code : '',
                            tax: JSON.stringify(ordersFilter.data[0].detail[0].tax_amount),
                            shipping: JSON.stringify(ordersFilter.data[0].detail[0].payment.shipping_amount),
                        },
                        products: itemsProduct.map((product) => ({
                            name: product.name,
                            id: product.sku,
                            category: product.categories[0].name || '',
                            price: JSON.stringify(product.price),
                            list: product.categories[0].name || '',
                            quantity: JSON.stringify(product.qty_ordered),
                            dimension4: product.quantity_and_stock_status.is_in_stock ? 'In stock' : 'Out stock',
                            dimension5: JSON.stringify(product.rating.total),
                            dimension6: JSON.stringify(product.rating.value),
                            dimension7: ordersFilter.data[0].detail[0].discount_amount !== 0 ? 'YES' : 'NO',
                        })),
                    },
                    currencyCode: storeConfig.base_currency_code || 'IDR',
                },
            };
            TagManager.dataLayer({
                dataLayer,
            });
        }
    }, [ordersFilter]);

    React.useEffect(() => function cleanup() {
        if (typeof window !== 'undefined') {
            const cdt = getCheckoutData();
            if (cdt) removeCheckoutData();
        }
    }, []);

    return (
        <Layout pageConfig={config}>
            <Content
                t={t}
                handleCotinue={handleCotinue}
                ordersFilter={ordersFilter}
                checkoutData={checkoutData}
            />
        </Layout>
    );
};

export default PageStoreCredit;
