import Product from "@pages/product";

Product.getInitialProps = async ({ req }) => ({
  namespacesRequired: ["common", "product"],
  url: req
    ? req.protocol + "://" + req.get("host")
    : window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : ""),
});

export default Product;
