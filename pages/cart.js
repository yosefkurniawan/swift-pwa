import Cart from "../src/components/pages/cart";
import Layout from "../src/components/layouts";
import CartHeader from "../src/components/pages/cart/components/header";

export async function getStaticProps(ctx) {
    const pageConfig = {
        title: "Shopping Bag",
        className: "cart",
        header: "relative"
    };

    // By returning { props: pageConfig }, the Page component
    // will receive `pageConfig` as a prop at build time
    return {
        props: {
            pageConfig
        }
    };
}

export default Layout(Cart, CartHeader);