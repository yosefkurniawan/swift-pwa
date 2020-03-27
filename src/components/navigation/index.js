import { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  LocalMall as LocalMallIcon,
  Person as PersonIcon
} from "@material-ui/icons";
import Router from "next/router";
import SearchModal from "../pages/search";

const Navigation = ({ pathname = "", show = true }) => {
  const [active, setActive] = useState(pathname);
  const [openSearch, setOpenSearch] = useState(false);
  const handleCloseSearch = close => {
    setOpenSearch(close);
    setActive("home");
  };
  if (show) {
    return (
      <>
        <SearchModal open={openSearch} setOpen={handleCloseSearch} />
        <BottomNavigation
          className="bottom-navigation"
          value={active}
          onChange={(event, newValue) => {
            setActive(newValue);
            switch (newValue) {
              case "home":
                Router.push("/");
                return;
              case "search":
                setOpenSearch(true);
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
          />
          <BottomNavigationAction
            label="Search"
            value="search"
            icon={<SearchIcon />}
          />
          <BottomNavigationAction
            label="Cart"
            value="cart"
            icon={<LocalMallIcon />}
          />
          <BottomNavigationAction
            label="Account"
            value="account"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </>
    );
  } else {
    return <></>;
  }
};

export default Navigation;
