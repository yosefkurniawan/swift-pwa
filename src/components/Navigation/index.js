import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import {
    Home as HomeIcon,
    Search as SearchIcon,
    LocalMall as LocalMallIcon,
    Person as PersonIcon
} from "@material-ui/icons";
import Router from "next/router";
import SearchModal from "@pages/search";
import useStyles from "./style";
import { withApollo } from "@lib/apollo";

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
                <SearchModal
                    open={openModal}
                    setOpenModal={handleOpenModal}
                />
                <BottomNavigation
                    className={styles.navigation}
                    value={active}
                    showLabels={false}
                    onChange={(event, newValue) => {
                        // setActive(newValue);
                        switch (newValue) {
                            case "home":
                                Router.push("/");
                                return;
                            case "browse":
                                handleOpenModal(true);
                                return;
                            case "cart":
                                Router.push("/cart");
                                return;
                            case "account":
                                Router.push("/customer/account");
                                return;
                            default:
                                return;
                        }
                    }}
                >
                    <BottomNavigationAction
                        label="Home"
                        value="home"
                        icon={<HomeIcon />}
                        classes={{
                            label: "hide",
                            root: styles.navAction
                        }}
                    />
                    <BottomNavigationAction
                        label="Search"
                        value="browse"
                        icon={<SearchIcon />}
                        classes={{
                            label: "hide",
                            root: styles.navAction
                        }}
                    />
                    <BottomNavigationAction
                        label="Cart"
                        value="cart"
                        icon={<LocalMallIcon />}
                        classes={{
                            label: "hide",
                            root: styles.navAction
                        }}
                    />
                    <BottomNavigationAction
                        label="Account"
                        value="account"
                        icon={<PersonIcon />}
                        classes={{
                            label: "hide",
                            root: styles.navAction
                        }}
                    />
                </BottomNavigation>
            </>
        );
    }else{
        return null;
    }
};

export default withApollo({ ssr: true })(Navigation);
