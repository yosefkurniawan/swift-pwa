/* eslint-disable object-curly-newline */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BrowseModal from '@common_searchmodal';
import ShoppingBagIcon from '@plugin_shoppingbag';

import { getLoginInfo } from '@helper_auth';

import Typography from '@common_typography';
import propTypes from 'prop-types';
import useStyles from '@core_modules/theme/components/header/mobile/style';
import { getAppEnv } from '@root/core/helpers/env';
import { modules } from '@config';
import { getStoreHost } from '@helpers/config';
import { getCategories } from '@core_modules/theme/services/graphql/index';

const CategoryList = dynamic(() => import('@core_modules/theme/components/header/mobile/CategoryList'), { ssr: true });

const Header = ({ LeftComponent, CenterComponent, RightComponent, className, pageConfig, storeConfig }) => {
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

        const { loading, data, error } = getCategories();

        const [openModal, setOpenModal] = React.useState(false);
        const handleOpenModal = (val) => {
            setOpenModal(val);
        };

        let isLogin = 0;
        if (typeof window !== 'undefined') {
            isLogin = getLoginInfo();
        }

        const TabPanel = (props) => {
            const { children, value, index, ...other } = props;

            return (
                <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
                    {value === index && (
                        <Box p={3}>
                            <Typography>{children}</Typography>
                        </Box>
                    )}
                </div>
            );
        };

        const a11yProps = (index) => ({
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        });

        const [value, setValue] = React.useState(0);

        const handleChange = (event, newValue) => {
            setValue(newValue);
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
                        <div className={styles.navRightMenu}>
                            <BrowseModal open={openModal} setOpenModal={handleOpenModal} />
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => handleOpenModal(true)}>
                                <SearchIcon />
                            </IconButton>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => router.push('/checkout/cart')}>
                                <ShoppingBagIcon storeConfig={storeConfig} />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Menu" {...a11yProps(0)} />
                        <Tab label="Account" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <div className={styles.hamburgerList} role="presentation">
                            <List>
                                <ListItem button divider onClick={() => router.push('/')}>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItem>
                                {data && data.categoryList[0] && <CategoryList loading={loading} data={data} error={error} />}
                            </List>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className={styles.hamburgerList} role="presentation">
                            <List>
                                <ListItem button divider onClick={() => router.push('/confirmpayment')}>
                                    <ListItemText primary="Confirm Payment" />
                                </ListItem>
                                <ListItem button divider onClick={() => router.push('/sales/order/track')}>
                                    <ListItemText primary="Track Order" />
                                </ListItem>
                                {isLogin ? (
                                    <ListItem button divider onClick={() => router.push('/customer/account')}>
                                        <ListItemText primary="Account Dashboard" />
                                    </ListItem>
                                ) : (
                                    <>
                                        <ListItem button divider onClick={() => router.push('/customer/account/create')}>
                                            <ListItemText primary="Create an Account" />
                                        </ListItem>
                                        <ListItem button divider onClick={() => router.push('/customer/account/login')}>
                                            <ListItemText primary="Sign In" />
                                            {/* eslint-disable-next-line indent, react/jsx-indent, react/jsx-closing-tag-location */}
                                        </ListItem>
                                    </>
                                )}
                            </List>
                        </div>
                    </TabPanel>
                </SwipeableDrawer>
                <Toolbar />
            </>
        );
    }

    if (pageConfig && !pageConfig.header) return null;

    const position = pageConfig && pageConfig.header === 'absolute' ? styles.headerAbsolute : styles.headerRelative;

    const containerStyle = classNames(styles.container, position, className);
    return (
        <div className={containerStyle}>
            <div className={styles.leftContainer}>
                {React.isValidElement(LeftComponent) ? (
                    LeftComponent
                ) : (
                    <Button onClick={(LeftComponent && LeftComponent.onClick && LeftComponent.onClick) || back} className={styles.btnBack}>
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
                            <Typography variant="h1" type="bold" letter="uppercase" align="center" className={styles.title}>
                                {pageConfig.headerTitle}
                            </Typography>
                        ) : null}
                    </>
                )}
            </div>
            <div className={styles.rightContainer}>{React.isValidElement(RightComponent) ? RightComponent : null}</div>
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
