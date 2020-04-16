import Page from '@pages/customer/address';

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer'],
});

export default Page;
