import Page from "@pages/thanks";

Page.getInitialProps = async () => ({
    namespacesRequired: ["common", "checkout"]
});

export default Page;
