import Router from 'next/router';
import { removeIsLoginFlagging } from '@helpers/auth';
import { removeCartId } from '@helpers/cartId';
import Cookies from 'js-cookie';
import { useApolloClient } from '@apollo/react-hooks';
import {
    custDataNameCookie,
} from '@config';
import { getCategories, getCustomer, removeToken } from '../../../services/graphql';

const CoreTopNavigation = (props) => {
    const {
        Content, storeConfig, t, isLogin,
    } = props;
    const [value, setValue] = React.useState('');
    const [deleteTokenGql] = removeToken();
    const { data, loading } = getCategories();

    let customerData = {};
    if (isLogin && typeof window !== 'undefined') {
        const customer = getCustomer();
        if (customer.data) {
            customerData = customer.data;
        }
    }
    const client = useApolloClient();

    const handleLogout = () => {
        deleteTokenGql().then(() => {
            Cookies.remove(custDataNameCookie);
            removeIsLoginFlagging();
            removeCartId();
            client.writeData({ data: { totalCart: 0 } });
            Router.push('/customer/account/login');
        }).catch(() => {
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
            category={data}
            loading={loading}
            storeConfig={storeConfig}
            handleSearch={handleSearch}
            searchByClick={searchByClick}
            setValue={setValue}
            customer={customerData}
            handleLogout={handleLogout}
            value={value}
        />
    );
};

export default CoreTopNavigation;
