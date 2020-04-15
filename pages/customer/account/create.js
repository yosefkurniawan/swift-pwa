import Page from '@pages/customer/register';

Page.getInitialProps = async () => ({
    namespacesRequired: ["common", "customer","validate"]
});

export default Page;
