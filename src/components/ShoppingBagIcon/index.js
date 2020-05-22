/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
import { getCartId, setCartId } from '@helpers/cartId';
import { getLoginInfo } from '@helpers/auth';
import { Badge, makeStyles } from '@material-ui/core';
import { LocalMall } from '@material-ui/icons';
import { GraphCart } from '@services/graphql';
import { setCountCart } from '@stores/actions/cart';
import { useDispatch, useSelector } from 'react-redux';
import { getCartIdUser } from '@services/graphql/schema/cart';
import { useQuery } from '@apollo/react-hooks';
import Router from 'next/router';

const useStyles = makeStyles({
    root: {
        margin: 20,
    },
});

const ShoppingBagIcon = ({ bottomNav = false }) => {
    const dispatch = useDispatch();
    const styles = useStyles();
    let isLogin = 0;
    let cartId = '';
    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
        cartId = getCartId();
    }
    const cartUser = useQuery(getCartIdUser, {
        context: {
            request: 'internal',
        },
        fetchPolicy: 'no-cache',
        skip: !isLogin,
    });

    if (isLogin && (cartId === '' || !cartId || cartId === undefined)) {
        if (cartUser.data) {
            const cartToken = cartUser.data.customerCart.id || '';
            cartId = cartToken;
            setCartId(cartToken);
        }
    }
    const getQty = GraphCart.getCountCart(cartId);

    React.useEffect(() => {
        if (!getQty.loading && getQty.data) {
            dispatch(setCountCart(getQty.data.cart.total_quantity));
        }
    }, [getQty]);

    const cartData = useSelector((state) => state.cart);
    if (!bottomNav) {
        return (
            <div className={styles.root} onClick={() => Router.push('/checkout/cart')}>
                <Badge color="secondary" badgeContent={cartData.totalCart || 0}>
                    <LocalMall color="secondary" />
                </Badge>
            </div>
        );
    }
    return (
        <Badge color="secondary" badgeContent={cartData.totalCart || 0}>
            <LocalMall color="secondary" />
        </Badge>
    );
};

export default ShoppingBagIcon;
