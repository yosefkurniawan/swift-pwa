import Page from '@pages/example/test-layout';

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'example'],
});

export default Page;
