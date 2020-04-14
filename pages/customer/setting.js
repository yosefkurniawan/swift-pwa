import Page from "@pages/customer/setting";

Page.getInitialProps = async () => ({
    namespacesRequired: ["common", "customer"]
});

export default Page;
