/* eslint-disable indent */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import NotificationBell from '@plugin_notificationbell';
import ShoppingBagIcon from '@plugin_shoppingbag';
import ProductCompareIcon from '@core_modules/catalog/plugins/ProductCompare';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';
import DesktopInstallAppV4 from '@core_modules/theme/components/header/desktop/components/v4/custom-install-popup/desktop';
import Menu from '@core_modules/theme/components/header/desktop/components/v4/mcategory';
import Autocomplete from '@core_modules/theme/components/header/desktop/components/autocomplete';
import OptionAutocomplete from '@core_modules/theme/components/header/desktop/components/autocomplete/view';
import React from 'react';
import Image from '@common_image';
import dynamic from 'next/dynamic';

const TopMenu = dynamic(() => import('@core_modules/theme/components/header/desktop/components/v4/mtop'), { ssr: false });

const ViewTopNavigation = (props) => {
    const {
        storeConfig,
        handleSearch,
        searchByClick,
        setValue,
        value,
        data,
        loading,
        t,
        isLogin,
        customer,
        handleLogout,
        app_cookies,
        showGlobalPromo,
        modules,
        vesMenuConfig,
        appName = 'Swift PWA',
        installMessage = 'Install',
        enablePopupInstallation = false,
    } = props;

    const [triger, setTriger] = React.useState(false);
    const [headerInnerTop, setHeaderInnerTop] = React.useState(showGlobalPromo ? 45 : 0);

    const maxHeightToShow = 600;

    React.useEffect(() => {
        setHeaderInnerTop(showGlobalPromo ? 45 : 0);
    }, [showGlobalPromo]);

    React.useEffect(() => {
        if (typeof window !== 'undefined' && storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header) {
            const searchbar = document.getElementById('hidden-searchbar');
            const checkScrollTop = () => {
                // handle show hide header
                if (searchbar) {
                    if (window.pageYOffset > 100) {
                        searchbar.classList.add('show-searchbox');
                        setHeaderInnerTop(0);
                    } else {
                        searchbar.classList.remove('show-searchbox');
                        setHeaderInnerTop(45);
                    }
                    if (!triger && window.pageYOffset > maxHeightToShow) {
                        setTriger(true);
                    } else if (triger && window.pageYOffset < maxHeightToShow) {
                        setTriger(false);
                    }
                }
            };
            window.addEventListener('scroll', checkScrollTop);
        }
    }, [triger]);

    const [anchorEl, setAnchorEl] = React.useState(null);

    /**
     * [METHOD] handle click popover
     * @param {*} event
     */
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * [METHOD] handle close popover
     */
    const handleClose = () => setAnchorEl(null);

    return (
        <div id="header-inner" style={{ top: `${headerInnerTop}px` }}>
            <div className="row header-top">
                <main style={{ width: '97%' }}>
                    <TopMenu
                        t={t}
                        isLogin={isLogin}
                        data={customer}
                        handleLogout={handleLogout}
                        app_cookies={app_cookies}
                        setValue={setValue}
                        value={value}
                        handleSearch={handleSearch}
                        OptionAutocomplete={OptionAutocomplete}
                        searchByClick={searchByClick}
                        storeConfig={storeConfig}
                        enablePopupInstallation={enablePopupInstallation}
                        appName={appName}
                        installMessage={installMessage}
                        DesktopInstallAppV4={DesktopInstallAppV4}
                        anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                        handleClick={handleClick}
                        handleClose={handleClose}
                    />
                </main>
            </div>
            <main style={{ width: '100%', maxWidth: 'unset' }}>
                <div className="header-main">
                    <div className="header-middle">
                        <div className="box header-middle__logo">
                            <Link href="/">
                                <a>
                                    <Image
                                        className="header-middle__logo-link"
                                        src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                        alt={storeConfig.default_title}
                                        width={120}
                                        height={52}
                                        storeConfig={storeConfig}
                                        lazy={false}
                                    />
                                </a>
                            </Link>
                        </div>
                        <div id="hidden-searchbar" className="header-middle__right hidden-searchbox">
                            <div className="box">
                                <div className="header-middle__icons">
                                    <div className="notification">
                                        <NotificationBell withLink />
                                    </div>
                                    {modules.productcompare.enabled && (
                                        <div className="shopping-bag">
                                            <ProductCompareIcon withLink isLogin={isLogin} />
                                        </div>
                                    )}
                                    <div id="header-shoppingBag-icon" className="shopping-bag">
                                        <ShoppingBagIcon withLink storeConfig={storeConfig} />
                                    </div>
                                </div>
                                <div className="header-middle__search">
                                    <Autocomplete
                                        setValue={setValue}
                                        handleSearch={handleSearch}
                                        OptionsItem={OptionAutocomplete}
                                        t={t}
                                        storeConfig={storeConfig}
                                    />
                                    <div className="search-icon">
                                        <IconButton disabled={value === ''} edge="start" onClick={searchByClick} aria-label="close">
                                            <SearchIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-middle">
                        <div className="header-middle__center">
                            <div className="row menu-category">
                                <div className="col-xs-12 menu-middle">
                                    {loading ? null : <Menu vesMenuConfig={vesMenuConfig} data={data} storeConfig={storeConfig} />}
                                </div>
                            </div>
                            <div className="header-small__menu">
                                {loading ? null : <Menu vesMenuConfig={vesMenuConfig} data={data} storeConfig={storeConfig} />}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <style jsx>
                {`
                    .header-main {
                        max-width: 1440px;
                        width: 97%;
                        margin: 0 auto;
                    }
                    @media (min-width: 768px) {
                        #header-inner {
                            ${storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header
                                ? 'position: fixed;'
                                : 'position: relative; z-index: 1100;'}
                            width: 100%;
                            background: white;
                            z-index: 3;
                            transition: top 1s ease;
                        }
                        #header-inner.header-inner {
                            top: 0px;
                        }
                        .hidden-submenu {
                            display: none !important;
                            transition: display 1s ease;
                        }
                    }
                    main {
                        background-color: ${storeConfig && storeConfig.pwa && storeConfig.pwa.background_color};
                    }
                    .header-top {
                        height: 5rem;
                        border-bottom: 1px solid #d6d6d6;
                        display: flex;
                        align-items: center;
                        padding: 1rem 0;
                        margin: 0;
                    }
                    @media only screen and (min-width: 768px) and (max-width: 1023px) {
                        .header-top {
                            height: unset;
                            padding-top: 0;
                        }
                    }
                    .header-middle {
                        height: 75px;
                        padding-top: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .header-middle__left {
                        width: 120px;
                    }
                    .header-middle__right {
                        width: 600px;
                        position: absolute;
                        right: 0;
                    }
                    .header-small__menu {
                        display: none;
                    }
                    .header-middle img {
                        width: 120px;
                    }
                    .header-middle__logo-link {
                        cursor: pointer;
                    }
                    .header-middle__icons {
                        float: right;
                        padding-left: 4px;
                        padding-right: 16px;
                    }
                    .header-middle__icons > div {
                        margin-right: -5px;
                        margin-left: 0px;
                        display: inline-block;
                    }
                    .search-icon {
                        position: absolute;
                        right: -10px;
                        top: 7px;
                        background: #fff;
                        z-index: 9;
                    }
                    .header-middle__search {
                        display: flex;
                        align-items: center;
                        float: right;
                        position: relative;
                    }
                    .menu-category {
                        width: fit-content;
                        display: block;
                    }
                    .global-promo {
                        height: 45px;
                        border-bottom: 1px solid #d6d6d6;
                        display: flex;
                        align-items: center;
                        padding: 10px 0;
                        margin: 0;
                        background-color: red;
                    }
                `}
            </style>
            <style global jsx>
                {`
                    .header-small {
                        top: -5rem !important;
                    }
                    @media (min-width: 1250px) {
                        .header-small .header-small__menu {
                            display: block;
                        }
                        .header-middle__center {
                            display: block !important;
                        }
                        .header-small .menu-category {
                            display: none;
                        }
                        .header-small {
                            height: 75px !important;
                        }
                    }
                    @media screen and (min-width: 1024px) {
                        .hidden-searchbox {
                            display: none;
                            transition: display 1s ease;
                        }
                        .show-searchbox {
                            display: block !important;
                            transition: display 1s ease;
                        }
                    }
                    @media screen and (max-width: 1024px) {
                        #hidden-searchbar .header-middle__search .MuiAutocomplete-root {
                            width: 12rem !important;
                        }
                    }
                    @media screen and (min-width: 1026px) {
                        #hidden-searchbar .header-middle__search .MuiAutocomplete-root {
                            width: 300px !important;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default ViewTopNavigation;
