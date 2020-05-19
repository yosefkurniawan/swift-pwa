import React, { useEffect } from 'react';
import Navigation from '@components/Navigation';
import Header from '@components/Header';
import Head from 'next/head';
import TagManager from 'react-gtm-module';

const Layout = (props) => {
    const {
        pageConfig, children, CustomHeader = false,
    } = props;

    useEffect(() => {
        const tagManagerArgs = {
            dataLayer: {
                pageName: pageConfig.title,
                pageType: pageConfig.pageType ? pageConfig.pageType : 'other',
                customerId: '', // @TODO: send if login only, fill width customer ID
                customerGroup: 'NOT LOGGED IN', // @TODO: fill width customer group from magento if logged in
            },
        };
        TagManager.dataLayer(tagManagerArgs);
    }, []);

    return (
        <>
            {pageConfig.title && pageConfig.title !== '' && (
                <Head>
                    <title>
                        {pageConfig.title}
                    </title>
                </Head>
            )}

            {React.isValidElement(CustomHeader) ? (
                <>{React.cloneElement(CustomHeader, { pageConfig })}</>
            ) : (
                <Header pageConfig={pageConfig} />
            )}

            <main style={{ marginBottom: pageConfig.bottomNav ? '60px' : 0 }}>{children}</main>
            <footer>
                <Navigation active={pageConfig.bottomNav} />
            </footer>
        </>
    );
};

export default Layout;
