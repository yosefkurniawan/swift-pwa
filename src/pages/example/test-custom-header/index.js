import Content from "./components";
import CustomHeader from "./components/header";
import Layout from "@components/Layouts";
import { withTranslation } from "@i18n";

const Page = ({ t }) => {
    const pageConfig = {
        title: t("example:testLayout:title"),
        header: "relative" // available values: "absolute", "relative", false (default)
    };
    return (
        <Layout pageConfig={pageConfig} CustomHeader={<CustomHeader />}>
            <Content />
        </Layout>
    );
};

export default withTranslation()(Page);
