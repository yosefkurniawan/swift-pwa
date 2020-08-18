import { removeIsLoginFlagging } from '@helpers/auth';
import { removeCartId } from '@helpers/cartId';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { useApolloClient } from '@apollo/react-hooks';
import {
    custDataNameCookie,
} from '@config';
import { getCustomer, removeToken } from '../../../../../services/graphql';

const TopMenu = (props) => {
    const { t, isLogin, TopView } = props;
    const [deleteTokenGql] = removeToken();
    let customerData = {};
    if (isLogin && typeof window !== 'undefined') {
        const { data } = getCustomer();
        if (data) {
            customerData = data;
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
    return (
        <TopView t={t} isLogin={isLogin} data={customerData} handleLogout={handleLogout} />
    );
};

export default TopMenu;
