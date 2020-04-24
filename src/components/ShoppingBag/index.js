import { Badge, IconButton } from '@material-ui/core';
import { LocalMall } from '@material-ui/icons';
import Router from 'next/router';
import { useSelector } from 'react-redux';

export default () => {
    const cartData = useSelector((state) => state.cart);
    return (
        <IconButton onClick={() => Router.push('/cart')}>
            <Badge color="secondary" badgeContent={cartData.totalCart || 0}>
                <LocalMall />
            </Badge>
        </IconButton>
    );
};
