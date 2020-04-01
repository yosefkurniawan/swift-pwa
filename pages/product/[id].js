import Product from "../../src/components/pages/product";
import Layout from "../../src/components/layouts";

export async function getServerSideProps() {
    const pageConfig = {
        title: "Product",
        className: "product",
        bottomNav : false
    };

    // By returning { props: pageConfig }, the Page component
    // will receive `pageConfig` as a prop at build time
    return {
        props: {
            pageConfig
        }
    };
}

export default Layout(Product);