import Page from '@pages/checkout';

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'checkout'],
});

export default Page;
