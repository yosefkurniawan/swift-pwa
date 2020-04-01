import Content from "./components";
import Layout from "../../layouts";
import { withTranslation } from "../../../../i18n";

const Page = props => {
    const { t } = props;
    const pageConfig = {
        title: t("cart:pageTitle"),
        header: "relative", // available values: "absolute", "relative", false (default)
        headerTitle: t("cart:pageTitle"),
        headerBackIcon: "close" // available values: "close", "arrow"
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

export default withTranslation()(Page);
