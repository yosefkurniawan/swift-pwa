import TestCustomHeader from "./components";
import CustomHeader from "./components/header";
import Layout from "../../../layouts";
import { withTranslation } from "../../../../../i18n";

const Page = ({ t }) => {
    const pageConfig = {
        title: t("example:testLayout:title"),
        header: "relative" // available values: "absolute", "relative", false (default)
    };
    return (
        <Layout pageConfig={pageConfig} CustomHeader={<CustomHeader/>}>
            <TestCustomHeader />
        </Layout>
    );
};

export default withTranslation()(Page);
