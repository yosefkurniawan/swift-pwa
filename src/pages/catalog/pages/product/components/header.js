import { Badge, IconButton } from '@material-ui/core';
import { LocalMall } from '@material-ui/icons';
import Header from '@components/Header';
import Router from 'next/router';
import { useSelector } from 'react-redux';

const ShoppingBagIcon = () => {
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
