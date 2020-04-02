import Page from "@pages/cart";

Page.getInitialProps = async () => ({
    namespacesRequired: ["common", "cart"]
});

export default Page;
