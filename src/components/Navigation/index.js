import BrowseModal from '@components/SearchModal';
import ShoppingBagIcon from '@components/ShoppingBagIcon';
import { withApollo } from '@lib/apollo';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
    Home as HomeIcon,
    Person as PersonIcon,
    Search as SearchIcon,
} from '@material-ui/icons';
import Router from 'next/router';
import { useState } from 'react';
import useStyles from './style';

// active: true (default), "home", "browse", "cart", "account"
const Navigation = ({ active = true }) => {
    const styles = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = (val) => {
        setOpenModal(val);
    };
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
                            Router.push('/checkout/cart');
                            return;
                        case 'account':
                            Router.push('/customer/account');
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
                        icon={<ShoppingBagIcon bottomNav />}
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
