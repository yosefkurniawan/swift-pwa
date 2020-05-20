import React, { useEffect } from 'react';
import Navigation from '@components/Navigation';
import Header from '@components/Header';
import Head from 'next/head';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';
import { HOST } from '@config';

const Layout = (props) => {
    const {
        pageConfig, children, CustomHeader = false,
        i18n,
    } = props;

    const { ogContent = {} } = pageConfig;
    const router = useRouter();
    const ogData = {
        title: pageConfig.title ? pageConfig.title : 'Swift PWA',
        image: '/assets/img/swift-logo.png',
        'image:type': 'image/png',
        url: `${process.env.NODE_ENV === 'production' ? HOST.prod : HOST.dev}${router.asPath}`,
        locale: i18n && i18n.language === 'id' ? 'id_ID' : 'en_US',
        type: 'website',
        ...ogContent,
    };
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
                    {Object.keys(ogData).map((key, idx) => (
                        <meta property={`og:${key}`} content={ogData[key]} key={idx} />
                    ))}
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
