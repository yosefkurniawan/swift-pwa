import Home from "../src/components/pages/home";
import Layout from "../src/components/layouts";

export async function getStaticProps() {

    // Page Configuration:
    // - title
    // - className
    const pageConfig = {
        title: "Homepage",
    };

    // By returning { props: pageConfig }, the Page component
    // will receive `pageConfig` as a prop at build time
    return {
        props: {
            pageConfig
        }
    };
}

export default Layout(Home);
