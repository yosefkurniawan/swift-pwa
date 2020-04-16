import Page from '@pages/customer/otp';

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer'],
});

export default Page;
