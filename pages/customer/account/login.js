import Page from '@pages/customer/login';

Page.getInitialProps = async () => ({
    namespacesRequired: ["common", "customer","validate"]
});

export default Page;
