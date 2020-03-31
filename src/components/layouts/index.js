import Navigation from "../navigation";
import Header from "../../components/commons/Header";
import Head from "next/head";

const Layout = (Page, CustomHeader) => {
    return class Layout extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <>
                    <Head>
                        <title>{this.props.pageConfig.title}</title>
                    </Head>

                    {CustomHeader ? (
                        <CustomHeader {...this.props} />
                    ) : (
                        <Header {...this.props} />
                    )}

                    <main>
                        <Page {...this.props} />
                    </main>
                    <footer>
                        {<Navigation show={this.props.pageConfig.bottomNav} />}
                    </footer>
                </>
            );
        }
    };
};

export default Layout;
