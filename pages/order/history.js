import Page from '@pages/order/history';

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order'],
});

export default Page;
