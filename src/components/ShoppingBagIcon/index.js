import { getCartId } from '@helpers/cartId';
import { getToken } from '@helpers/token';
import { Badge, makeStyles } from '@material-ui/core';
import { LocalMall } from '@material-ui/icons';
import { GraphCart } from '@services/graphql';
import { setCountCart } from '@stores/actions/cart';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
    root: {
        margin: 20,
    },
});

const ShoppingBagIcon = ({ bottomNav = false }) => {
    const dispatch = useDispatch();
    const styles = useStyles();
    let token = '';
    let cartId = '';
    if (typeof window !== 'undefined') {
        token = getToken();
        cartId = getCartId();
    }
    const getQty = GraphCart.getCountCart(token, cartId);

    React.useEffect(() => {
        if (!getQty.loading && getQty.data) {
            dispatch(setCountCart(getQty.data.cart.total_quantity));
        }
    }, [getQty]);

    const cartData = useSelector((state) => state.cart);
    if (!bottomNav) {
        return (
            <Link href="/cart">
                <a className={styles.root}>
                    <Badge
                        color="secondary"
                        badgeContent={cartData.totalCart || 0}
                    >
                        <LocalMall color="secondary" />
                    </Badge>
                </a>
            </Link>
        );
    }
    return (
        <Badge color="secondary" badgeContent={cartData.totalCart || 0}>
            <LocalMall color="secondary" />
        </Badge>
    );
};

export default ShoppingBagIcon;
