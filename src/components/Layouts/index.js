import React from "react";
import Navigation from "@components/Navigation";
import Header from "@components/Header";
import Head from "next/head";

// Layout params:
// - pageConfig
// - CustomHeader (optional)
const Layout = (props) => {
    const pageConfig = props.pageConfig;
    return (
        <>
            <Head>
                <title>{props.pageConfig.title}</title>
            </Head>

            {React.isValidElement(props.CustomHeader) ? (
                <>{React.cloneElement(props.CustomHeader, { pageConfig })}</>
            ) : (
                <Header pageConfig={props.pageConfig} />
            )}

            <main className={pageConfig.className}>
                {React.cloneElement(props.children, { pageConfig })}
            </main>
            <footer>
                {<Navigation active={props.pageConfig.bottomNav} />}
            </footer>
        </>
    );
};

export default Layout;

