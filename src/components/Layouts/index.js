import React from 'react';
import Navigation from '@components/Navigation';
import Header from '@components/Header';
import Head from 'next/head';
import { withRedux } from '@lib/redux';
import { compose } from 'redux';
import { useSelector } from 'react-redux';
// Layout params:
// - pageConfig
// - CustomHeader (optional)
const Layout = (props) => {
    const { pageConfig, children, CustomHeader } = props;
    const storeConfig = useSelector((state) => state.config.storeConfig);
    return (
        <>
            <Head>
                <title>{pageConfig.title || (storeConfig.default_title && storeConfig.default_title)}</title>
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

export default compose(withRedux)(Layout);
