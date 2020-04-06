import Product from "@pages/product";

Product.getInitialProps = async () => ({
    namespacesRequired: ["common", "product"]
});

export default Product