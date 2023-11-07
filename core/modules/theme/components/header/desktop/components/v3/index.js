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
import DesktopInstallApp from '@core_modules/theme/components/custom-install-popup/desktop';
import Menu from '@core_modules/theme/components/header/desktop/components/v3/mcategory';
import Autocomplete from '@core_modules/theme/components/header/desktop/components/autocomplete';
import OptionAutocomplete from '@core_modules/theme/components/header/desktop/components/autocomplete/view';
import Image from '@common_image';
import dynamic from 'next/dynamic';

const TopMenu = dynamic(() => import('@core_modules/theme/components/header/desktop/components/mtop'), { ssr: false });

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

    return (
        <div id="header-inner">
            <div className="row header-top">
                <main style={{ width: '97%' }}>
                    {enablePopupInstallation ? <DesktopInstallApp appName={appName} installMessage={installMessage} /> : null}
                    <TopMenu
                        t={t}
                        isLogin={isLogin}
                        data={customer}
                        handleLogout={handleLogout}
                        app_cookies={app_cookies}
                        storeConfig={storeConfig}
                    />
                </main>
            </div>
            <main style={{ width: '100%', maxWidth: 'unset' }}>
                <div className="header-main">
                    <div className="header-middle">
                        <div className="header-middle__left">
                            <div className="box header-middle__logo">
                                <Link href="/" legacyBehavior>
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
                        </div>
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
                        <div className="header-middle__right">
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
                                    {/* <TextField
                                        id="standard-basic"
                                        label="Search..."
                                        onChange={(e) => setValue(e.target.value)}
                                        onKeyPress={(e) => handleSearch(e)}
                                    /> */}
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
                </div>
            </main>
            <div className="header-tab">
                <div className="row menu-category">
                    <div className="col-xs-12">{loading ? null : <Menu vesMenuConfig={vesMenuConfig} data={data} storeConfig={storeConfig} />}</div>
                </div>
                <div className="header-small__menu">
                    {loading ? null : <Menu vesMenuConfig={vesMenuConfig} data={data} storeConfig={storeConfig} />}
                </div>
            </div>
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
                            top: ${showGlobalPromo ? '45px' : '0'};
                            transition: top 1s ease;
                        }
                        #header-inner.header-inner {
                            top: 0px;
                        }
                        .header-middle__center {
                            display: none;
                        }
                    }
                    main {
                        background-color: ${storeConfig && storeConfig.pwa && storeConfig.pwa.background_color};
                    }
                    .header-top {
                        height: 45px;
                        border-bottom: 1px solid #d6d6d6;
                        display: flex;
                        align-items: center;
                        padding: 10px 0;
                        margin: 0;
                    }
                    @media only screen and (max-width: 1023px) and (min-width: 768px) {
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
                        justify-content: space-between;
                    }
                    .header-middle__left {
                        width: 120px;
                    }
                    .header-middle__right {
                        width: 600px;
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
                        top: -45px !important;
                    }
                    @media (min-width: 1250px) {
                        .header-small .header-small__menu {
                            display: block;
                        }
                        .header-middle__center {
                            display: block !important;
                        }
                        .header-tab {
                            display: none;
                        }
                        .header-small .menu-category {
                            display: none;
                        }
                        .header-small {
                            height: 75px !important;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default ViewTopNavigation;
