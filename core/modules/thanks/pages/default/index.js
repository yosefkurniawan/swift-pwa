import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import { getCheckoutDataFromRequest } from '@helper_cookies';
import Router from 'next/router';
import Core from './core';
import Skeleton from './components/Loader';
import Content from './components';
import ErrorInfo from './components/ErrorInfo';

const Page = (props) => (
    <Core
        Skeleton={Skeleton}
        Content={Content}
        ErrorInfo={ErrorInfo}
        {...props}
    />
);

Page.getInitialProps = async (ctx) => {
    const checkoutData = getCheckoutDataFromRequest(ctx);
    if (!checkoutData) {
        if (ctx.res) {
            ctx.res.statusCode = 302;
            ctx.res.setHeader('Location', '/');
            return { props: {}, namespacesRequired: ['common', 'thanks', 'home'] };
        }
        Router.push('/');
    }
    return {
        query: ctx.query,
        checkoutData: typeof checkoutData === 'string' ? JSON.parse(checkoutData) : checkoutData,
        namespacesRequired: ['common', 'thanks'],
    };
};

export default withApollo({ ssr: true })(withTranslation()(Page));
