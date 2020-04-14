import Content from "./components";
import Layout from "@components/Layouts";
import { withTranslation } from "@i18n";

const Page = props => {
    const { t } = props;
    const pageConfig = {
        title: t("order:title"),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle : t("order:title") ,
        bottomNav: false
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

export default withTranslation()(Page);
