import Component from './components'
import { withTranslation } from '../../../../i18n'
import Layout from "../../layouts";

const Page = props => {
    const pageConfig = {
        title: "[Category Name]",
        header: "absolute" // available values: "absolute", "relative", false (default)
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Component {...props} />
        </Layout>
    );
};

export default withTranslation()(Page);
