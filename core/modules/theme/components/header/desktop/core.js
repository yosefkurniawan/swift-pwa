import Router from 'next/router';
import { removeIsLoginFlagging } from '@helper_auth';
import { removeCartId } from '@helper_cartid';
import Cookies from 'js-cookie';
import { removeCookies } from '@helper_cookies';
import { useApolloClient } from '@apollo/client';
import { localTotalCart, localCompare } from '@services/graphql/schema/local';
import firebase from 'firebase/app';
import { custDataNameCookie, features, modules } from '@config';
import {
    getCategories, getCustomer, removeToken, getVesMenu,
} from '@core_modules/theme/services/graphql';
import { vesMenuConfig } from '@services/graphql/repository/pwa_config';

const CoreTopNavigation = (props) => {
    const {
        Content, storeConfig, t, app_cookies, isLogin, showGlobalPromo, ...other
    } = props;
    const [value, setValue] = React.useState('');
    const [deleteTokenGql] = removeToken();
    const [stateData, setData] = React.useState({
        loading: true,
        data: null,
    });
    const { loading: loadConfig, data: dataConfig, error: errorConfig } = vesMenuConfig();
    const [actGetVestMenu, {
        loading: loadVesMenu, data: dataVesmenu,
    }] = getVesMenu();
    const [actGetCategory, { loading: loadCategory, data: dataCategory }] = getCategories();

    React.useEffect(() => {
        if (!loadVesMenu && dataVesmenu && dataVesmenu.vesMenu) {
            setData({
                ...stateData,
                loading: false,
                data: dataVesmenu,
            });
        }
    }, [dataVesmenu]);

    React.useEffect(() => {
        if (!loadCategory && dataCategory && dataCategory.vesMenu) {
            setData({
                ...stateData,
                loading: false,
                data: dataCategory,
            });
        }
    }, [dataCategory]);

    React.useEffect(() => {
        setData({
            ...stateData,
            loading: true,
        });
        if (!loadConfig && !errorConfig && dataConfig && dataConfig.storeConfig) {
            if (dataConfig.storeConfig.pwa.ves_menu_enable) {
                actGetVestMenu({
                    variables: {
                        alias: dataConfig.storeConfig.pwa.ves_menu_alias,
                    },
                });
            } else {
                actGetCategory();
            }
        }
    }, [dataConfig]);

    let customerData = {};
    if (isLogin && typeof window !== 'undefined') {
        const customer = getCustomer();
        if (customer.data) {
            customerData = customer.data;
        }
    }
    const client = useApolloClient();

    const handleLogout = () => {
        window.backdropLoader(true);
        deleteTokenGql()
            .then(() => {
                Cookies.remove(custDataNameCookie);
                removeIsLoginFlagging();
                removeCartId();
                removeCookies('uid_product_compare');
                if (features.firebase.config.apiKey && features.firebase.config.apiKey !== '') {
                    firebase.auth().signOut().then(() => {
                        // Sign-out successful.
                    }).catch(() => {
                        // An error happened.
                        // console.log(error);
                    });
                }
                client.writeQuery({ query: localTotalCart, data: { totalCart: 0 } });
                client.writeQuery({ query: localCompare, data: { item_count: 0 } });
                window.backdropLoader(false);
                Router.push('/customer/account/login');
            })
            .catch((e) => {
                window.backdropLoader(false);
                console.log(e);
                //
            });
    };

    const handleSearch = (ev) => {
        if (ev.key === 'Enter' && ev.target.value !== '') {
            Router.push({
                pathname: '/catalogsearch/result',
                query: { q: value },
            });
        }
    };

    const searchByClick = () => {
        if (value !== '') {
            Router.push({
                pathname: '/catalogsearch/result',
                query: { q: value },
            });
        }
    };

    if (!loadConfig && !errorConfig && dataConfig && dataConfig.storeConfig) {
        return (
            <Content
                {...other}
                t={t}
                isLogin={isLogin}
                data={stateData.data}
                loading={stateData.loading}
                vesMenuConfig={dataConfig.storeConfig.pwa}
                storeConfig={storeConfig}
                handleSearch={handleSearch}
                searchByClick={searchByClick}
                setValue={setValue}
                customer={customerData}
                handleLogout={handleLogout}
                value={value}
                app_cookies={app_cookies}
                showGlobalPromo={showGlobalPromo}
                modules={modules}
            />
        );
    }

    return null;
};

export default CoreTopNavigation;
