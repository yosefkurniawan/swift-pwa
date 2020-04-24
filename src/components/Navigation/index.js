import { useState } from 'react';
import {
    BottomNavigation,
    BottomNavigationAction,
    Badge,
} from '@material-ui/core';
import {
    Home as HomeIcon,
    Search as SearchIcon,
    LocalMall as LocalMallIcon,
    Person as PersonIcon,
} from '@material-ui/icons';
import Router from 'next/router';
import BrowseModal from '@components/SearchModal';
import { withApollo } from '@lib/apollo';
import { useSelector } from 'react-redux';
import useStyles from './style';

// active: true (default), "home", "browse", "cart", "account"
const Navigation = ({ active = true }) => {
    const styles = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = (val) => {
        setOpenModal(val);
    };
    const cartData = useSelector((state) => state.cart);
    if (active) {
        return (
            <>
                <BrowseModal open={openModal} setOpenModal={handleOpenModal} />
                <BottomNavigation
                    className={styles.navigation}
                    value={active}
                    showLabels={false}
                    onChange={(event, newValue) => {
                        switch (newValue) {
                        case 'home':
                            Router.push('/');
                            return;
                        case 'browse':
                            handleOpenModal(true);
                            return;
                        case 'cart':
                            Router.push('/cart');
                            return;
                        case 'account':
                            Router.push('/customer/account/login');
                            break;
                        default:
                        }
                    }}
                >
                    <BottomNavigationAction
                        label="Home"
                        value="home"
                        icon={<HomeIcon />}
                        classes={{
                            label: 'hide',
                            root: styles.navAction,
                        }}
                    />
                    <BottomNavigationAction
                        label="Search"
                        value="browse"
                        icon={<SearchIcon />}
                        classes={{
                            label: 'hide',
                            root: styles.navAction,
                        }}
                    />
                    <BottomNavigationAction
                        label="Cart"
                        value="cart"
                        icon={(
                            <Badge color="secondary" badgeContent={cartData.totalCart || 0}>
                                <LocalMallIcon />
                            </Badge>
                        )}
                        classes={{
                            label: 'hide',
                            root: styles.navAction,
                        }}
                    />
                    <BottomNavigationAction
                        label="Account"
                        value="account"
                        icon={<PersonIcon />}
                        classes={{
                            label: 'hide',
                            root: styles.navAction,
                        }}
                    />
                </BottomNavigation>
            </>
        );
    }
    return null;
};

export default withApollo({ ssr: true })(Navigation);
