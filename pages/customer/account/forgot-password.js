import Page from "@pages/forgotPassword";

Page.getInitialProps = async () => ({
    namespacesRequired: ["common", "customer"]
});

export default Page;
