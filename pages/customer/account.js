import Page from '@pages/customer/account';

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer'],
});

export default Page;
