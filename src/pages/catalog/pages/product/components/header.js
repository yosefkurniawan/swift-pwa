import { Badge, IconButton } from '@material-ui/core';
import { LocalMall } from '@material-ui/icons';
import Header from '@components/Header';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setCountCart } from '@stores/actions/cart';
import { getCartId } from '@helpers/cartId';
import { GraphCart } from '@services/graphql';
import { getToken } from '@helpers/token';

const ShoppingBagIcon = () => {
    const dispatch = useDispatch();
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
    return (
        <IconButton onClick={() => Router.push('/cart')}>
            <Badge color="secondary" badgeContent={cartData.totalCart || 0}>
                <LocalMall />
            </Badge>
        </IconButton>
    );
};

const CustomHeader = ({ pageConfig }) => (
    <Header
        pageConfig={pageConfig}
        RightComponent={<ShoppingBagIcon />}
    />
);

export default CustomHeader;
