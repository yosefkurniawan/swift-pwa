import Page from '@pages/searchResult';

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'search'],
});

export default Page;
