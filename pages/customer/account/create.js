import Page from '@pages/customer/register';

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer'],
});

export default Page;
