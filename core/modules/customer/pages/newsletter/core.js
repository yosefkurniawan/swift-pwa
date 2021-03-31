import Layout from '@layout';
import { useMutation } from '@apollo/client';
import { getCustomerSettings } from '../../services/graphql';

import * as Schema from '../../services/graphql/schema';

const NewsletterPage = (props) => {
    const {
        t, Content, pageConfig, app_cookies,
    } = props;
    const config = {
        title: t('customer:setting:newsletter'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:setting:newsletter'),
        bottomNav: false,
    };

    const [settings, setSettings] = React.useState({
        is_subscribed: false,
    });

    const [actUpdateCustomer, resultUpdate] = useMutation(Schema.updateCustomer);
    if (!resultUpdate.loading && typeof window !== 'undefined' && window.backdropLoader) {
        setTimeout(() => {
            window.backdropLoader(false);
        }, 500);
    }
    const handleSave = () => {
        window.backdropLoader(true);
        actUpdateCustomer({
            variables: {
                isSubscribed: settings.is_subscribed,
            },
            context: {
                request: 'internal',
            },
        });
    };
    let customer = {};
    if (typeof window !== 'undefined') {
        const { data } = getCustomerSettings();
        if (data && data.customer) {
            customer = data.customer;
        }
    }
    React.useEffect(() => {
        if (customer.is_subscribed) {
            setSettings({
                ...{
                    is_subscribed: true,
                },
            });
        }
    }, [customer]);

    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content t={t} customer={customer} setSettings={setSettings} handleSave={handleSave} app_cookies={app_cookies} />
        </Layout>
    );
};

export default NewsletterPage;
