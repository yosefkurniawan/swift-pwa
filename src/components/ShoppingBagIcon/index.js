/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
import { getCartId, setCartId } from '@helpers/cartId';
import { getLoginInfo } from '@helpers/auth';
import Badge from '@material-ui/core/Badge';
import makeStyles from '@material-ui/core/styles/makeStyles';
import LocalMall from '@material-ui/icons/LocalMall';
import { GraphCart } from '@services/graphql';
import { getCartIdUser } from '@services/graphql/schema/cart';
import { useQuery } from '@apollo/react-hooks';
import Router from 'next/router';
import { gql } from 'apollo-boost';

const GET_COUNT_CART = gql`
  {
    totalCart @client
  }
`;

const useStyles = makeStyles({
    root: {
        margin: 20,
    },
});

const ShoppingBagIcon = ({ bottomNav = false }) => {
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
    const { data, client } = useQuery(GET_COUNT_CART);
    React.useEffect(() => {
        if (!getQty.loading && getQty.data) {
            client.writeData({ data: { totalCart: getQty.data.cart.total_quantity } });
        }
    }, [getQty]);

    const cartData = data && data.totalCart ? data.totalCart : 0;
    if (!bottomNav) {
        return (
            <div className={styles.root} onClick={() => Router.push('/checkout/cart')}>
                <Badge color="secondary" badgeContent={cartData || 0}>
                    <LocalMall color="secondary" />
                </Badge>
            </div>
        );
    }
    return (
        <Badge color="secondary" badgeContent={cartData || 0}>
            <LocalMall color="secondary" />
        </Badge>
    );
};

export default ShoppingBagIcon;
