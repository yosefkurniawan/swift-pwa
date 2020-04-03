import Content from "./components";
import Layout from "@components/Layouts";
import { withTranslation } from "@i18n";

const Page = () => {
    const pageConfig = {
        title: "Test Graphql",
        header: "relative" // available values: "absolute", "relative", false (default)
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content />
        </Layout>
    );
};

export default withTranslation()(Page);
