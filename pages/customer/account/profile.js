import Page from '@pages/customer/profile';

Page.getInitialProps = async () => ({
    namespacesRequired: ["common", "customer","validate"]
});

export default Page;
