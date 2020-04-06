import Component from './components'
import { withTranslation } from '@i18n'
import Layout from "@components/Layouts";
import { useRouter } from 'next/router'

const Page = props => {
    const router = useRouter()
    const pageConfig = {
        title: "[Search Result]",
        header: "relative", // available values: "absolute", "relative", false (default)
        headerTitle : 'Search Result : '+router.query.id,
        bottomNav: "browse"
    };
    return (
        <Layout pageConfig={pageConfig} >
            <Component {...props} />
        </Layout>
    );
};

export default withTranslation()(Page);
