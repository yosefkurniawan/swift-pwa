import Content from "./components";
import Layout from "../../../layouts";
import { withTranslation } from "../../../../../i18n";

const Page = ({ t }) => {
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
