import Page from '@pages/order/detail';

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order'],
});

export default Page;
