/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';

import BrowseModal from '@common_searchmodal';
import ShoppingBagIcon from '@plugin_shoppingbag';

import Typography from '@common_typography';
import propTypes from 'prop-types';
import useStyles from '@core_modules/theme/components/header/mobile/style';
import { getAppEnv } from '@root/core/helpers/env';
import { modules } from '@config';
import { getStoreHost } from '@helpers/config';

const Header = ({
    LeftComponent,
    CenterComponent,
    RightComponent,
    className,
    pageConfig,
    storeConfig,
}) => {
    const styles = useStyles();
    const router = useRouter();
    const back = () => {
        if (modules.checkout.checkoutOnly) {
            window.location.replace(getStoreHost(getAppEnv()));
        } else if (sessionStorage.getItem('prevUrl') === '/') {
            router.push('/');
        } else {
            router.back();
        }
    };

    if (storeConfig && storeConfig.pwa && storeConfig.pwa.mobile_navigation === 'burger_menu') {
        const logoUrl = `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`;

        const [drawerOpen, setDrawerOpen] = React.useState(false);
        const toggleDrawer = (open) => (event) => {
            if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
            setDrawerOpen(open);
        };

        const [openModal, setOpenModal] = React.useState(false);
        const handleOpenModal = (val) => {
            setOpenModal(val);
        };

        return (
            <>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <div className={classNames(styles.logo, 'hidden-desktop')}>
                            <img src={logoUrl} alt="logo" className={styles.imgLogoHamburger} />
                        </div>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <BrowseModal open={openModal} setOpenModal={handleOpenModal} />
                    <div
                        className={styles.hamburgerList}
                        role="presentation"
                    >
                        <List>
                            <ListItem button onClick={() => router.push('/')}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                            <Divider />
                            <ListItem
                                button
                                onClick={() => {
                                    toggleDrawer(false);
                                    handleOpenModal(true);
                                }}
                            >
                                <ListItemIcon>
                                    <SearchIcon />
                                </ListItemIcon>
                                <ListItemText primary="Search" />
                            </ListItem>
                            <Divider />
                            <ListItem button onClick={() => router.push('/checkout/cart')}>
                                <ListItemIcon>
                                    <ShoppingBagIcon storeConfig={storeConfig} />
                                </ListItemIcon>
                                <ListItemText primary="Shopping Cart" />
                            </ListItem>
                            <Divider />
                            <ListItem button onClick={() => router.push('/customer/account')}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Account" />
                            </ListItem>
                        </List>
                    </div>
                </SwipeableDrawer>
                <Toolbar />
            </>
        );
    }

    if (pageConfig && !pageConfig.header) return null;

    const position = pageConfig && pageConfig.header === 'absolute'
        ? styles.headerAbsolute
        : styles.headerRelative;

    const containerStyle = classNames(styles.container, position, className);
    return (
        <div className={containerStyle}>
            <div className={styles.leftContainer}>
                {React.isValidElement(LeftComponent) ? (
                    LeftComponent
                ) : (
                    <Button
                        onClick={
                            (LeftComponent
                                && LeftComponent.onClick
                                && LeftComponent.onClick)
                            || back
                        }
                        className={styles.btnBack}
                    >
                        {pageConfig.headerBackIcon && pageConfig.headerBackIcon === 'close' ? (
                            <CloseIcon className={styles.backIcon} />
                        ) : (
                            <ArrowBack className={styles.backIcon} />
                        )}
                    </Button>
                )}
            </div>
            <div className={styles.centerContainer}>
                {React.isValidElement(CenterComponent) ? (
                    CenterComponent
                ) : (
                    <>
                        {pageConfig.headerTitle ? (
                            <Typography
                                variant="h1"
                                type="bold"
                                letter="uppercase"
                                align="center"
                                className={styles.title}
                            >
                                {pageConfig.headerTitle}
                            </Typography>
                        ) : null}
                    </>
                )}
            </div>
            <div className={styles.rightContainer}>
                {React.isValidElement(RightComponent) ? RightComponent : null}
            </div>
        </div>
    );
};

Header.propTypes = {
    LeftComponent: propTypes.any,
    CenterComponent: propTypes.any,
    RightComponent: propTypes.any,
    className: propTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    pageConfig: propTypes.object,
};

Header.defaultProps = {
    LeftComponent: null,
    CenterComponent: null,
    RightComponent: null,
    className: '',
    pageConfig: {
        header: 'relative',
    },
};

export default Header;
