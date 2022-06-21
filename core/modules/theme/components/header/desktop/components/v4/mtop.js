/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import NotificationBell from '@plugin_notificationbell';
import ShoppingBagIcon from '@plugin_shoppingbag';
import ProductCompareIcon from '@core_modules/catalog/plugins/ProductCompare';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@core_modules/theme/components/header/desktop/components/autocomplete';
import SwitcherLanguage from '@common_language';
import SwitcherCurrency from '@common_currency';
import config from '@config';

const ViewTop = (props) => {
    const { isLogin, t, data, handleLogout, value, setValue, handleSearch, OptionAutocomplete, searchByClick, storeConfig } = props;
    const { modules } = config;

    const [triger, setTriger] = React.useState(false);

    const maxHeightToShow = 600;

    React.useEffect(() => {
        if (typeof window !== 'undefined' && storeConfig && storeConfig.pwa && storeConfig.pwa.enabler_sticky_header) {
            const topSearchbox = document.getElementById('top-searchbox');
            const checkScrollTop = () => {
                // handle show hide header
                if (topSearchbox) {
                    if (window.pageYOffset > 100) {
                        topSearchbox.classList.add('hide-searchbox');
                    } else {
                        topSearchbox.classList.remove('hide-searchbox');
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

    return (
        <>
            <ul>
                <li>
                    {!isLogin ? (
                        t('common:header:welcome')
                    ) : (
                        <>
                            <Link href="/customer/account">
                                <a>
                                    {data.customer
                                        ? `${t('common:header:hi').replace('$', `${data.customer.firstname} ${data.customer.lastname}`)}`
                                        : null}
                                </a>
                            </Link>
                            <ul>
                                <li>
                                    <Link href="/customer/account">
                                        <a>{t('common:menu:myaccount')}</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/wishlist">
                                        <a>
                                            {t('common:menu:mywishlist')} ({data.wishlist ? data.wishlist.items.length : 0} items ){' '}
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <a href="#" onClick={handleLogout}>
                                        {t('common:menu:signout')}
                                    </a>
                                </li>
                            </ul>
                        </>
                    )}
                </li>
                {modules.confirmpayment.enabled ? (
                    <li>
                        <Link href="/confirmpayment">
                            <a>{t('common:menu:confirmpayment')}</a>
                        </Link>
                    </li>
                ) : null}
                {modules.trackingorder.enabled ? (
                    <li>
                        <Link href="/sales/order/track">
                            <a>{t('common:menu:trackingorder')}</a>
                        </Link>
                    </li>
                ) : null}
                {!isLogin ? (
                    <li>
                        <Link href="/customer/account/login">
                            <a>{t('common:menu:sign')}</a>
                        </Link>{' '}
                        {t('common:menu:or')}{' '}
                        <Link href="/customer/account/create">
                            <a>{t('common:menu:register')}</a>
                        </Link>{' '}
                    </li>
                ) : null}
                <li>
                    <SwitcherLanguage {...props} />
                </li>
                <li>
                    <SwitcherCurrency {...props} />
                </li>
            </ul>
            <div className="header-middle__right" id="top-searchbox">
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
                        <div className="shopping-bag">
                            <ShoppingBagIcon withLink storeConfig={storeConfig} />
                        </div>
                    </div>
                    <div className="header-middle__search">
                        <Autocomplete setValue={setValue} handleSearch={handleSearch} OptionsItem={OptionAutocomplete} t={t} />
                        <div className="search-icon">
                            <IconButton disabled={value === ''} edge="start" onClick={searchByClick} aria-label="close">
                                <SearchIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    ul {
                        margin: 0;
                        list-style: none;
                        padding: 0.5rem;
                        float: left;
                        font-size: 10px;
                        text-transform: uppercase;
                        font-family: Montserrat !important;
                    }

                    li {
                        display: inline-block;
                        padding: 5px 10px;
                        position: relative;
                    }
                    li:hover > ul {
                        display: block;
                    }
                    ul ul {
                        position: absolute;
                        display: none;
                        margin: 0;
                        padding: 5px 10px;
                        z-index: 999;
                        background: #fff;
                        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
                    }
                    ul ul li {
                        display: block;
                    }

                    ul ul ul {
                        position: absolute;
                        top: 0;
                        left: 100%;
                    }
                    a {
                        color: #000;
                        text-decoration: none;
                    }

                    a:hover {
                        border-bottom: 1px dashed #fff;
                        color: #b9acac;
                    }
                    .header-middle__search {
                        display: flex;
                        align-items: center;
                        float: right;
                        position: relative;
                        margin-top: -0.75rem;
                    }
                    .search-icon {
                        position: absolute;
                        right: -10px;
                        top: 7px;
                        background: #fff;
                        z-index: 9;
                    }
                    .header-middle__icons {
                        position: relative;
                        margin-top: -0.75rem;
                        float: right;
                        padding-left: 4px;
                        padding-right: 16px;
                    }
                    .header-middle__icons > div {
                        margin-right: -5px;
                        margin-left: 0px;
                        display: inline-block;
                    }
                    .hide-searchbox {
                        display: none !important;
                        transition: display 1s ease;
                    }
                `}
            </style>
        </>
    );
};
export default ViewTop;
