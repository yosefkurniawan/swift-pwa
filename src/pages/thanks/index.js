import Content from "./component";
import Layout from "@components/Layouts";
import { withTranslation } from "@i18n";

const Page = (props) => {
    const pageConfig = {
        title: props.t("checkout:thanks"),
        bottomNav : false,
    };
    return (
        <Layout pageConfig={pageConfig} >
            <Content {...props} />
        </Layout>
    );
};

export default withTranslation()(Page);
