import Page from "@pages/home";

Page.getInitialProps = async () => ({
    namespacesRequired: ["common", "home"]
});

export default Page;
