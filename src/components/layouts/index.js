import React from "react";
import Navigation from "../navigation";
import Header from "../../components/commons/Header";
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

            <main>{React.cloneElement(props.children, { pageConfig })}</main>
            <footer>{<Navigation show={props.pageConfig.bottomNav} />}</footer>
        </>
    );
};

export default Layout;

