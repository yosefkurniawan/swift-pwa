import Page from '@pages/customer/forgotPassword';

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer', 'validate'],
});

export default Page;
