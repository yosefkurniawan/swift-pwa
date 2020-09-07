/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
import Layout from '@core/customer/components/layout';
import SkeletonStoreLocator from './skeleton';

const StoreLocatorPage = (props) => {
    const {
        t,
        loading,
    } = props;

    return (
        <Layout {...props}>
            {
                loading
                    ? (
                        <SkeletonStoreLocator />
                    )
                    : (
                        <div>
                            Store Locationsssssssssssssss
                            {t('storelocator:title')}
                        </div>
                    )
            }
        </Layout>
    );
};

export default StoreLocatorPage;
