/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
/* eslint-disable max-len */

import { useApolloClient, useReactiveVar } from '@apollo/client';
import { storeConfigVar } from '@root/core/services/graphql/cache';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import TagManager from 'react-gtm-module';
// eslint-disable-next-line object-curly-newline
import { assetsVersion, basePath, custDataNameCookie, debuging, features, modules } from '@config';
import { createCompareList } from '@core_modules/product/services/graphql';
import useStyles from '@core_modules/theme/layout/style';
import { getAppEnv } from '@helpers/env';
import { getHost } from '@helper_config';
import { getCookies, setCookies } from '@helper_cookies';
import { breakPointsDown, breakPointsUp } from '@helper_theme';
import crypto from 'crypto';
import Fab from '@material-ui/core/Fab';
import ChatIcon from '@material-ui/icons/Chat';

import PopupInstallAppMobile from '@core_modules/theme/components/custom-install-popup/mobile';
import Copyright from '@core_modules/theme/components/footer/desktop/components/copyright';
import { getCountCart } from '@core_modules/theme/services/graphql';
import { frontendConfig } from '@helpers/frontendOptions';
import { getCartId } from '@helper_cartid';
import { localTotalCart } from '@services/graphql/schema/local';

const GlobalPromoMessage = dynamic(() => import('@core_modules/theme/components/globalPromo'), { ssr: false });
const BottomNavigation = dynamic(() => import('@common_bottomnavigation'), { ssr: false });
const HeaderMobile = dynamic(() => import('@common_headermobile'), { ssr: false });
const HeaderDesktop = dynamic(() => import('@common_headerdesktop'), { ssr: true });
const Message = dynamic(() => import('@common_toast'), { ssr: false });
const Loading = dynamic(() => import('@common_loaders/Backdrop'), { ssr: false });
const ScrollToTop = dynamic(() => import('@common_scrolltotop'), { ssr: false });
const Footer = dynamic(() => import('@common_footer'), { ssr: false });
const RestrictionPopup = dynamic(() => import('@common_restrictionPopup'), { ssr: false });
const NewsletterPopup = dynamic(() => import('@core_modules/theme/components/newsletterPopup'), { ssr: false });
const RecentlyViewed = dynamic(() => import('@core_modules/theme/components/recentlyViewed'), { ssr: false });

// CHAT FEATURES IMPORT
const ChatContent = dynamic(() => import('@core_modules/customer/plugins/ChatPlugin'), { ssr: false });
// END CHAT FEATURES IMPORT

const Layout = (props) => {
    const bodyStyles = useStyles();
    const {
        dataVesMenu,
        pageConfig,
        children,
        app_cookies,
        CustomHeader = false,
        i18n,
        storeConfig = {},
        isLogin,
        headerProps = {},
        data = {},
        t,
        onlyCms,
        withLayoutHeader = true,
        withLayoutFooter = true,
        showRecentlyBar = false,
        isHomepage = false,
        isPdp = false,
        isCms = false,
        isPlp = false,
        isBdp = false,
        isBlp = false,
        isCheckout = false,
        isLoginPage = false,
        isShowChat = true,
        // deviceType = {},
        preloadImages = [],
    } = props;
    const { ogContent = {}, schemaOrg = null, headerDesktop = true, footer = true } = pageConfig;
    const router = useRouter();
    const appEnv = getAppEnv();
    const enablePromo = getCookies(features.globalPromo.key_cookies) !== ''
        ? !!getCookies(features.globalPromo.key_cookies)
        : storeConfig.global_promo?.enable;

    const [state, setState] = useState({
        toastMessage: {
            open: false,
            variant: 'success',
            text: '',
        },
        backdropLoader: false,
    });
    const [restrictionCookies, setRestrictionCookies] = useState(false);
    const [showGlobalPromo, setShowGlobalPromo] = React.useState(enablePromo);
    const [setCompareList] = createCompareList();
    const frontendCache = useReactiveVar(storeConfigVar);

    // get app name config

    let appName = '';
    let installMessage = '';
    let showPopup = false;
    let iconAppleTouch = `${basePath}/assets/img/swiftpwa_apple_touch.png`;
    if (storeConfig && storeConfig.pwa) {
        iconAppleTouch = storeConfig.pwa.icon_apple_touch;
        appName = storeConfig.pwa.app_name;
        showPopup = storeConfig.pwa.custom_install_app_enable;
        installMessage = storeConfig.pwa.install_message || 'Install';
    }

    // const [mainMinimumHeight, setMainMinimumHeight] = useState(0);
    const refFooter = useRef(null);
    const refHeader = useRef(null);
    const client = useApolloClient();

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

    const handleRestrictionCookies = () => {
        setRestrictionCookies(true);
        setCookies('user_allowed_save_cookie', true);
    };

    const handleClosePromo = () => {
        setShowGlobalPromo(false);
    };

    const allowHeaderCheckout = modules.checkout.checkoutOnly ? !modules.checkout.checkoutOnly : withLayoutHeader;

    const ogData = {
        'og:image:type': 'image/png',
        'og:locale': i18n && i18n.language === 'id' ? 'id_ID' : 'en_US',
        ...ogContent,
    };

    if (!ogData['og:description']) {
        ogData['og:description'] = storeConfig.default_description || '';
    }

    if (!ogData['og:title']) {
        ogData['og:title'] = pageConfig.title ? pageConfig.title : storeConfig.default_title ? storeConfig.default_title : 'Swift Pwa' || '';
    }

    if (!ogData['og:image']) {
        ogData['og:image'] = storeConfig.header_logo_src
        ? `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`
        : `${getHost()}${basePath}/assets/img/swift-logo.png` || '';
    }

    if (!ogData['og:url']) {
        ogData['og:url'] = `${getHost()}${router.asPath}` || '';
    }

    if (!ogData['og:type']) {
        ogData['og:type'] = 'website';
    }

    if (storeConfig && storeConfig.pwa && storeConfig.pwa.facebook_meta_id_app_id) {
        ogData['fb:app_id'] = storeConfig.pwa.facebook_meta_id_app_id;
    }

    React.useEffect(() => {
        if (!isLogin && modules.productcompare.enabled) {
            const uid_product = getCookies('uid_product_compare');
            if (!uid_product) {
                setCompareList({
                    variables: {
                        uid: [],
                    },
                })
                    .then(async (res) => {
                        setCookies('uid_product_compare', res.data.createCompareList.uid);
                    })
                    .catch((e) => {
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: debuging.originalError ? e.message.split(':')[1] : t('common:productCompare:failedCompare'),
                        });
                    });
            }
        }
    }, [isLogin]);

    const reloadCartQty = typeof window !== 'undefined' && window && window.reloadCartQty;
    let cartId = '';
    const [getCart, RespondCart] = getCountCart();
    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }

    useEffect(() => {
        if (RespondCart && RespondCart.data) {
            client.writeQuery({
                query: localTotalCart,
                data: { totalCart: RespondCart.data.cart.total_quantity },
            });
        }
    }, [RespondCart]);

    useEffect(() => {
        if (reloadCartQty && cartId) {
            // query get cart
            getCart({
                variables: {
                    cartId,
                },
            });
            window.reloadCartQty = false;
        }
    }, [reloadCartQty]);

    useEffect(() => {
        const isRestrictionMode = getCookies('user_allowed_save_cookie');
        if (isRestrictionMode) {
            setRestrictionCookies(isRestrictionMode);
        }
        if (typeof window !== 'undefined') {
            window.toastMessage = handleSetToast;
            window.backdropLoader = handleLoader;
            const custData = Cookies.getJSON(custDataNameCookie);
            const tagManagerArgs = {
                dataLayer: {
                    pageName: pageConfig.title,
                    pageType: pageConfig.pageType || 'other',
                    customerGroup: isLogin === 1 ? 'GENERAL' : 'NOT LOGGED IN',
                },
            };
            if (custData && custData.email) {
                const custEmail = custData.email.toLowerCase();
                tagManagerArgs.dataLayer.eid = crypto.createHash('sha256').update(custEmail).digest('hex');
            }
            if (custData && custData.phonenumber && custData.is_phonenumber_valid) {
                let custPhone = custData.phonenumber;
                custPhone = `${custPhone}`;
                tagManagerArgs.dataLayer.pid = crypto.createHash('sha256').update(custPhone).digest('hex');
            }
            TagManager.dataLayer(tagManagerArgs);
        }
        // setMainMinimumHeight(refFooter.current.clientHeight + refHeader.current.clientHeight);
    }, []);

    const desktop = breakPointsUp('md');

    const ipadUp = breakPointsUp('sm');
    const ipadDown = breakPointsDown('md');

    const ipadLUp = breakPointsUp('md');
    const ipadLDown = breakPointsDown('lg');

    const ipad = !!(ipadUp && ipadDown);
    const ipadL = !!(ipadLUp && ipadLDown);

    const styles = {
        marginBottom:
            pageConfig.bottomNav && storeConfig?.pwa?.mobile_navigation === 'bottom_navigation' && storeConfig?.pwa?.enabler_footer_mobile === true
                ? '60px'
                : 0,
        marginTop: storeConfig?.pwa?.mobile_navigation === 'burger_menu' && !isHomepage && !isPdp ? '55px' : 0,
    };

    const footerMobile = {
        marginBottom: pageConfig.bottomNav && storeConfig.pwa && storeConfig.pwa.mobile_navigation === 'bottom_navigation' ? '55px' : 0,
        display: pageConfig.bottomNav && storeConfig.pwa && storeConfig.pwa.mobile_navigation === 'bottom_navigation' ? 'flex' : null,
    };

    if (!headerDesktop) {
        styles.marginTop = 0;
    }

    useEffect(() => {
        if (storeConfig && storeConfig.pwa && typeof window !== 'undefined') {
            const pwaConfig = frontendCache.pwa;

            const stylesheet = document.createElement('style');
            const fontStylesheet = document.createElement('link');
            const fontStylesheetHeading = document.createElement('link');

            if (pwaConfig) {
                // eslint-disable-next-line max-len
                fontStylesheet.href = `https://fonts.googleapis.com/css2?family=${
                    pwaConfig.default_font && pwaConfig.default_font !== '0' ? pwaConfig.default_font.replace(' ', '-') : 'Montserrat'
                }:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&display=swap`;
                fontStylesheet.id = 'font-stylesheet-id';
                fontStylesheet.rel = 'stylesheet';
                // eslint-disable-next-line max-len
                fontStylesheetHeading.href = `https://fonts.googleapis.com/css2?family=${
                    pwaConfig.heading_font && pwaConfig.default_font !== '0' ? pwaConfig.heading_font.replace(' ', '-') : 'Montserrat'
                }:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&display=swap`;
                fontStylesheetHeading.id = 'font-stylesheet-heading-id';
                fontStylesheetHeading.rel = 'stylesheet';
                stylesheet.innerHTML = frontendConfig(pwaConfig);
                stylesheet.id = 'frontend-options-stylesheet';
                if (!document.getElementById('frontend-options-stylesheet') && !document.getElementById('font-stylesheet-id')) {
                    document.head.appendChild(fontStylesheet);
                    document.head.appendChild(fontStylesheetHeading);
                    document.head.appendChild(stylesheet);
                }
            }
        }
    }, [storeConfig]);

    let classMain;

    if (storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header) {
        if (isCheckout) {
            classMain = 'checkout-mode';
        } else if (storeConfig.pwa.header_version === 'v2') {
            if (isHomepage) {
                if (ipadL) {
                    classMain = 'main-app-v2-ipad-landscape';
                } else {
                    classMain = 'main-app-v2';
                }
                classMain += ' main-app-homepage';
            } else if (isPdp && desktop) {
                classMain = 'main-app-v2-pdp';
            } else if (isLoginPage && desktop) {
                classMain = 'main-app-v2-login';
            } else if (isPdp && ipad && !desktop) {
                classMain = 'main-app-sticky-v2-ipad';
            } else {
                classMain = 'main-app-v2-not-homepage';
            }
        } else if (storeConfig.pwa.header_version === 'v1') {
            if (isHomepage) {
                classMain = 'main-app-v1-sticky-homepage';
            } else {
                classMain = 'main-app-v1-sticky-not-homepage';
            }
        } else if (storeConfig.pwa.header_version === 'v4') {
            if (isHomepage) {
                if (ipad) {
                    if (storeConfig.pwa.mobile_navigation === 'burger_menu') {
                        classMain = 'main-app-sticky-v4-homepage';
                    } else {
                        classMain = 'main-app-sticky-v4-homepage-not-burgermenu';
                    }
                } else {
                    classMain = 'main-app-sticky-v4-homepage';
                }
            } else if (isPdp) {
                if (ipad) {
                    classMain = 'main-app-sticky-v4-pdp-ipad';
                } else {
                    classMain = 'main-app-sticky-v4-pdp';
                }
            } else {
                classMain = 'main-app-sticky-v4';
            }
        } else if (isHomepage) {
            classMain = 'main-app-sticky-homepage';
        } else {
            classMain = 'main-app-sticky';
        }
    } else if (storeConfig && storeConfig.pwa && !storeConfig.pwa.enabler_sticky_header) {
        if (isCheckout) {
            classMain = 'checkout-mode';
        } else if (storeConfig.pwa.header_version === 'v2') {
            if (isHomepage) {
                classMain = 'main-app-v2-not-sticky';
                classMain += ' main-app-homepage';
            } else if (isPdp && ipad) {
                classMain = 'main-app-v2-ipad';
            } else {
                classMain = 'main-app-v2-not-sticky-not-homepage';
            }
        } else if (storeConfig.pwa.header_version === 'v4') {
            classMain = 'main-app-not-sticky';
        } else {
            classMain = 'main-app-not-sticky';
        }
    }

    let metaDescValue = ogData['og:description'];
    let metaTitleValue = ogData['og:title'];
    let metaKeywordValue = pageConfig.title ? pageConfig.title : storeConfig.default_title ? storeConfig.default_title : 'Swift Pwa';

    if (isPlp) {
        metaDescValue = data && data?.meta_description ? data?.meta_description : ogData['og:description'];
        metaTitleValue = data && data?.meta_title ? data?.meta_title : ogData['og:title'];
        metaKeywordValue = data && data?.meta_keywords ? data?.meta_keywords : '';
    }
    if (isPdp) {
        metaDescValue = data && data.products?.items[0].meta_description ? data.products?.items[0].meta_description : ogData['og:description'];
        metaTitleValue = data && data.products?.items[0].meta_title ? data.products?.items[0].meta_title : ogData['og:title'];
        metaKeywordValue = data && data.products?.items[0].meta_keyword ? data.products?.items[0].meta_keyword : '';
    }
    if (isCms) {
        metaDescValue = data && data.cmsPage?.meta_description ? data.cmsPage?.meta_description : ogData['og:description'];
        metaTitleValue = data && data.cmsPage?.meta_title ? data.cmsPage?.meta_title : ogData['og:title'];
        metaKeywordValue = data && data.cmsPage?.meta_keywords ? data.cmsPage?.meta_keywords : '';
    }
    if (isBdp) {
        metaDescValue = data && data?.meta_description ? data?.meta_description : ogData['og:description'];
        metaTitleValue = data && data?.meta_title ? data?.meta_title : ogData['og:title'];
        metaKeywordValue = data && data?.meta_keywords ? data?.meta_keywords : '';
    }
    if (isBlp) {
        const dataBlp = data?.getBlogCategory?.data[0];
        metaDescValue = data && dataBlp.meta_description ? dataBlp.meta_description : ogData['og:description'];
        metaTitleValue = data && dataBlp.meta_title ? dataBlp.meta_title : ogData['og:title'];
        metaKeywordValue = data && dataBlp.meta_keywords ? dataBlp.meta_keywords : '';
    }

    const canonicalUrl = `${getHost()}${router.asPath}`;
    const defaultLang = i18n && i18n.language === 'id' ? 'id_ID' : 'en_US';
    return (
        <>
            <Head>
                <meta name="keywords" content={metaKeywordValue} />
                <meta name="robots" content={appEnv === 'prod' && storeConfig.pwa ? storeConfig.pwa.default_robot : 'NOINDEX,NOFOLLOW'} />
                <link rel="apple-touch-icon" href={iconAppleTouch} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="title" content={metaTitleValue} />
                <meta name="description" content={metaDescValue} />
                {Object.keys(ogData).map((key, idx) => {
                    let valueWithMeta = ogData[key];
                    if (key === 'og:description') {
                        valueWithMeta = metaDescValue;
                    }
                    if (key === 'og:title') {
                        valueWithMeta = metaTitleValue;
                    }
                    if (typeof ogData[key] === 'object' && ogData[key].type && ogData[key].type === 'meta') {
                        valueWithMeta = ogData[key].value;
                        if (key === 'description') {
                            valueWithMeta = metaDescValue;
                        }
                        if (key === 'title') {
                            valueWithMeta = metaTitleValue;
                        }
                        return <meta name={`${key}`} content={valueWithMeta} key={idx} />;
                    }
                    return <meta property={`${key}`} content={valueWithMeta} key={idx} />;
                })}
                <title>{pageConfig.title ? pageConfig.title : storeConfig.default_title ? storeConfig.default_title : 'Swift Pwa'}</title>
                {schemaOrg
                    ? schemaOrg.map((val, idx) => (
                          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(val) }} key={idx} />
                      ))
                    : null}
                <link
                    rel="canonical"
                    href={canonicalUrl.substring(0, canonicalUrl.indexOf('?') !== -1 ? canonicalUrl.indexOf('?') : canonicalUrl.length)}
                />
                <link
                    rel="alternate"
                    hrefLang={defaultLang}
                    href={canonicalUrl.substring(0, canonicalUrl.indexOf('?') !== -1 ? canonicalUrl.indexOf('?') : canonicalUrl.length)}
                />
                {preloadImages && Object.values(preloadImages).map((_image) => <link rel="preload" as="image" href={_image} />)}
                {showPopup && <script src={`/static/firebase/install.${assetsVersion}.js`} defer />}
            </Head>
            {showPopup && storeConfig && storeConfig.pwa && storeConfig.pwa.header_version !== 'v2' ? (
                <PopupInstallAppMobile appName={appName} installMessage={installMessage} />
            ) : null}
            {allowHeaderCheckout && (
                <header ref={refHeader}>
                    {typeof window !== 'undefined' && storeConfig.global_promo && storeConfig.global_promo.enable && (
                        <GlobalPromoMessage
                            t={t}
                            storeConfig={storeConfig}
                            showGlobalPromo={showGlobalPromo}
                            handleClose={handleClosePromo}
                            appName={appName}
                            installMessage={installMessage}
                        />
                    )}
                    <div className="hidden-mobile">
                        {desktop && headerDesktop ? (
                            <HeaderDesktop
                                storeConfig={storeConfig}
                                isLogin={isLogin}
                                t={t}
                                app_cookies={app_cookies}
                                showGlobalPromo={showGlobalPromo}
                                enablePopupInstallation={showPopup}
                                appName={appName}
                                installMessage={installMessage}
                                dataVesMenu={dataVesMenu}
                                isHomepage={isHomepage}
                            />
                        ) : null}
                    </div>
                    <div className="hidden-desktop">
                        {React.isValidElement(CustomHeader) ? (
                            <>{React.cloneElement(CustomHeader, { pageConfig, ...headerProps })}</>
                        ) : (
                            <HeaderMobile pageConfig={pageConfig} storeConfig={storeConfig} {...headerProps} isCheckout />
                        )}
                    </div>
                </header>
            )}
            <main
                style={{ ...styles, position: classMain === 'checkout-mode' ? 'relative' : '' }}
                className={classNames(!onlyCms ? 'main-app' : 'main-app main-app-cms', classMain)}
                id="maincontent"
            >
                <Loading open={state.backdropLoader} />
                <Message
                    open={state.toastMessage.open}
                    variant={state.toastMessage.variant}
                    setOpen={handleCloseMessage}
                    message={state.toastMessage.text}
                />
                {!isHomepage && storeConfig.weltpixel_newsletter_general_enable === '1' && (
                    <NewsletterPopup t={t} storeConfig={storeConfig} pageConfig={pageConfig} isLogin={isLogin} />
                )}
                {children}
                {desktop ? <ScrollToTop {...props} /> : null}
            </main>

            {/* CHAT FEATURES */}
            {features.chatSystem.enable && isShowChat && (
                <div className={bodyStyles.chatPlugin}>
                    {isLogin ? (
                        <ChatContent />
                    ) : (
                        <Fab
                            color="primary"
                            size="medium"
                            onClick={() => router.push(`${getHost()}/customer/account/login`)}
                            className={bodyStyles.buttonChat}
                        >
                            <ChatIcon className={bodyStyles.chatIcon} />
                        </Fab>
                    )}
                </div>
            )}
            {/* END CHAT FEATURES */}

            {withLayoutFooter && (
                <footer className={bodyStyles.footerContainer} ref={refFooter}>
                    {desktop ? (
                        <div className="hidden-mobile">
                            {footer ? <Footer storeConfig={storeConfig} t={t} /> : null}
                            <Copyright storeConfig={storeConfig} />
                        </div>
                    ) : null}
                    {footer && storeConfig?.pwa?.enabler_footer_mobile === true ? (
                        <div className="hidden-desktop" style={{ ...footerMobile }}>
                            <Footer storeConfig={storeConfig} t={t} />
                        </div>
                    ) : null}
                    {desktop ? null : storeConfig && storeConfig.pwa && storeConfig.pwa.mobile_navigation === 'bottom_navigation' ? (
                        <BottomNavigation active={pageConfig.bottomNav} storeConfig={storeConfig} />
                    ) : null}
                </footer>
            )}
            {storeConfig.cookie_restriction && !restrictionCookies && (
                <RestrictionPopup handleRestrictionCookies={handleRestrictionCookies} restrictionStyle={bodyStyles.cookieRestriction} />
            )}
            {showRecentlyBar && !onlyCms && (
                <RecentlyViewed
                    isActive={storeConfig && storeConfig.weltpixel_RecentlyViewedBar_general_enable}
                    recentlyBtn={bodyStyles.recentView}
                    wrapperContent={bodyStyles.recentlyWrapperContent}
                    recentlyBtnContent={bodyStyles.recentlyBtnContent}
                    contentFeatured={bodyStyles.contentFeatured}
                    className={bodyStyles.itemProduct}
                />
            )}
        </>
    );
};

export default Layout;
