import React from 'react';
import Navigation from '@components/Navigation';
import Header from '@components/Header';
import Head from 'next/head';

// Layout params:
// - pageConfig
// - CustomHeader (optional)
const Layout = (props) => {
    const { pageConfig, children, CustomHeader } = props;
    return (
        <>
            <Head>
                <title>{pageConfig.title}</title>
            </Head>

            {React.isValidElement(CustomHeader) ? (
                <>{React.cloneElement(CustomHeader, { pageConfig })}</>
            ) : (
                <Header pageConfig={pageConfig} />
            )}

            <main>
                {children}
            </main>
            <footer>
                <Navigation active={pageConfig.bottomNav} />
            </footer>
        </>
    );
};

export default Layout;
