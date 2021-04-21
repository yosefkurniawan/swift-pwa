/* eslint-disable no-unused-vars */
import Router from 'next/router';
import { removeIsLoginFlagging } from '@helper_auth';
import { removeCartId } from '@helper_cartid';
import Cookies from 'js-cookie';
import { useApolloClient } from '@apollo/client';
import { localTotalCart } from '@services/graphql/schema/local';
import firebase from 'firebase/app';
import { custDataNameCookie, features } from '@config';
import {
    getCategories, getCustomer, removeToken, getVesMenu, getCmsBlocks,
} from '../../../services/graphql';

const CoreTopNavigation = (props) => {
    const {
        Content, storeConfig, t, app_cookies, isLogin,
    } = props;
    const [value, setValue] = React.useState('');
    const [deleteTokenGql] = removeToken();

    const { data, loading } = features.vesMenu.enabled
        ? getVesMenu({
            variables: {
                alias: features.vesMenu.alias,
            },
        })
        : getCategories();
    let customerData = {};
    if (isLogin && typeof window !== 'undefined') {
        const customer = getCustomer();
        if (customer.data) {
            customerData = customer.data;
        }
    }
    const client = useApolloClient();

    const handleLogout = () => {
        deleteTokenGql()
            .then(() => {
                Cookies.remove(custDataNameCookie);
                removeIsLoginFlagging();
                removeCartId();
                firebase.auth().signOut().then(() => {
                    // Sign-out successful.
                }).catch((error) => {
                    // An error happened.
                    // console.log(error);
                });
                client.writeQuery({ query: localTotalCart, data: { totalCart: 0 } });
                Router.push('/customer/account/login');
            })
            .catch(() => {
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

    return (
        <Content
            t={t}
            isLogin={isLogin}
            data={data}
            loading={loading}
            storeConfig={storeConfig}
            handleSearch={handleSearch}
            searchByClick={searchByClick}
            setValue={setValue}
            customer={customerData}
            handleLogout={handleLogout}
            value={value}
            app_cookies={app_cookies}
        />
    );
};

export default CoreTopNavigation;
