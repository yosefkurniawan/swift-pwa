/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@components/Header';
import Head from 'next/head';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { custDataNameCookie, features } from '@config';
import { getHost } from '@helpers/config';

const Navigation = dynamic(() => import('@components/Navigation'), { ssr: false });
const Message = dynamic(() => import('@Toast'), { ssr: false });
const Loading = dynamic(() => import('@components/Loaders/Backdrop'), { ssr: false });

const Layout = (props) => {
    const {
        pageConfig,
        children,
        CustomHeader = false,
        i18n, storeConfig = {},
        isLogin,
        headerProps = {},
    } = props;
    const { ogContent = {}, schemaOrg = null } = pageConfig;
    const router = useRouter();
    const [state, setState] = useState({
        toastMessage: {
            open: false,
            variant: '',
            text: '',
        },
        backdropLoader: false,
    });

    const handleSetToast = (message) => {
        setState({
            ...state,
            toastMessage: {
                ...state.toastMessage,
                ...message,
            },
        });
    };

    const handleLoader = (status = false) => {
        setState({
            ...state,
            backdropLoader: status,
        });
    };

    const handleCloseMessage = () => {
        setState({
            ...state,
            toastMessage: {
                ...state.toastMessage,
                open: false,
            },
        });
    };

    const ogData = {
        'og:title': pageConfig.title ? pageConfig.title : 'Swift PWA',
        'og:image': storeConfig.header_logo_src
            ? `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`
            : `${getHost()}/assets/img/swift-logo.png`,
        'og:image:type': 'image/png',
        'og:url': `${getHost()}${router.asPath}`,
        'og:locale': i18n && i18n.language === 'id' ? 'id_ID' : 'en_US',
        'og:type': 'website',
        ...ogContent,
    };

    if (!ogData['og:description']) {
        ogData['og:description'] = storeConfig.default_description;
    }

    if (features.facebookMetaId.enabled) {
        ogData['fb:app_id'] = features.facebookMetaId.app_id;
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.toastMessage = handleSetToast;
            window.backdropLoader = handleLoader;
            const custData = Cookies.getJSON(custDataNameCookie);
            const tagManagerArgs = {
                dataLayer: {
                    pageName: pageConfig.title,
                    customerGroup: isLogin === 1 ? 'GENERAL' : 'NOT LOGGED IN',
                },
            };
            if (custData && custData.email) tagManagerArgs.dataLayer.customerId = custData.email;
            TagManager.dataLayer(tagManagerArgs);
        }
    }, []);

    return (
        <>
            <Head>
                <meta name="keywords" content={pageConfig.title ? pageConfig.title : 'Swift PWA'} />
                <meta name="robots" content="INDEX,FOLLOW" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="description" content={ogData['og:description']} />
                {Object.keys(ogData).map((key, idx) => {
                    if (typeof ogData[key] === 'object' && ogData[key].type && ogData[key].type === 'meta') {
                        return <meta name={`${key}`} content={ogData[key].value} key={idx} />;
                    }
                    return <meta property={`${key}`} content={ogData[key]} key={idx} />;
                })}
                <title>{pageConfig.title ? pageConfig.title : 'Swift PWA'}</title>
                {schemaOrg
                    ? (
                        schemaOrg.map((val, idx) => (
                            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(val) }} key={idx} />
                        ))
                    ) : null}
            </Head>

            {React.isValidElement(CustomHeader)
                ? <>{React.cloneElement(CustomHeader, { pageConfig, ...headerProps })}</>
                : <Header {...headerProps} pageConfig={pageConfig} />}

            <main style={{ marginBottom: pageConfig.bottomNav ? '60px' : 0 }}>
                <Loading open={state.backdropLoader} />
                <Message
                    open={state.toastMessage.open}
                    variant={state.toastMessage.variant}
                    setOpen={handleCloseMessage}
                    message={state.toastMessage.text}
                />
                {children}
            </main>
            <footer>
                <Navigation active={pageConfig.bottomNav} />
            </footer>
        </>
    );
};

export default Layout;
