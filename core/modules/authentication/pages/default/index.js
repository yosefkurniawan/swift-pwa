import { withApollo } from '@lib_apollo';
import Loader from '@common_loaders/Backdrop';
import { withTranslation } from '@i18n';
import Core from './core';
// import { decrypt } from '@helpers/encryption';

const Content = () => <Loader open />;

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async (ctx) => {
    const { req } = ctx;
    if (!req.query.state) {
        ctx.res.statusCode = 302;
        ctx.res.setHeader('Location', '/');
        return { props: {}, namespacesRequired: ['common'] };
    }
    return {
        query: req.query,
        namespacesRequired: ['common', 'checkout'],
    };
};

export default withApollo({ ssr: false })(withTranslation()(Page));
