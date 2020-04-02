import Content from "./components";
import CustomHeader from "./components/header";
import Layout from "@components/Layouts";
import { withTranslation } from "@i18n";

const Page = (props) => {
    const pageConfig = {
        title: props.t("example:testLayout:title"),
        bottomNav : false,
        header: "absolute" // available values: "absolute", "relative", false (default)
    };
    return (
        <Layout pageConfig={pageConfig} CustomHeader={<CustomHeader />}>
            <Content {...props} />
        </Layout>
    );
};

export default withTranslation()(Page);
