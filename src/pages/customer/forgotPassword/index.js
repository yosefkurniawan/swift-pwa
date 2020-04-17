import Content from "./component";
import Layout from "@components/Layouts";
import { withTranslation } from "@i18n";

const Page = props => {
    const { t } = props;
    const pageConfig = {
        title: t("customer:forgotPassword:title"),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle : t("customer:forgotPassword:title") ,
        bottomNav: false
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

export default withTranslation()(Page);
