/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import NotificationBell from '@core/notification/plugins/NotificationBell';
import ShoppingBagIcon from '@core/cart/plugin/ShoppingBag';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';
import Menu from './mcategory';
import TopMenu from './mtop';

const ViewTopNavigation = (props) => {
    const {
        storeConfig, handleSearch, searchByClick, setValue, value, data, loading, t, isLogin, customer, handleLogout,
    } = props;
    return (
        <div id="header">
            <div className="row header-top">
                <main>
                    <TopMenu t={t} isLogin={isLogin} data={customer} handleLogout={handleLogout} />
                </main>
            </div>
            <main>
                <div className="row header-middle">
                    <div className="col-xs-2">
                        <div className="box header-middle__logo">
                            <Link href="/">
                                <img
                                    className="header-middle__logo-link"
                                    src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="col-xs-5">
                        <div className="header-small__menu">
                            {loading ? null : <Menu data={data} storeConfig={storeConfig} />}
                        </div>
                    </div>
                    <div className="col-xs-5">
                        <div className="box">
                            <div className="header-middle__icons">
                                <div className="notification"><NotificationBell withLink /></div>
                                <div className="shopping-bag"><ShoppingBagIcon withLink /></div>
                            </div>
                            <div className="header-middle__search">
                                <TextField
                                    id="standard-basic"
                                    label="Search..."
                                    onChange={(e) => setValue(e.target.value)}
                                    onKeyPress={(e) => handleSearch(e)}
                                />
                                <div className="search-icon">
                                    <IconButton
                                        disabled={value === ''}
                                        edge="start"
                                        onClick={searchByClick}
                                        aria-label="close"
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row menu-category">
                    <div className="col-xs-12">
                        {loading ? null : <Menu data={data} storeConfig={storeConfig} />}
                    </div>
                </div>

            </main>
            <style jsx>
                {`
                    #header {
                        height: 170px;
                    }
                    .header-top {
                        height: 45px;
                        border-bottom: 1px solid #d6d6d6;
                        display: flex;
                        align-items: center;
                        padding: 10px 0;
                        margin: 0;
                    }
                    .header-middle {
                        height: 75px;
                        padding-top: 10px;
                        display: flex;
                        align-items: center;
                    }
                    .header-small__menu {
                        display: none;
                    }
                    .header-middle img {
                        width: 120px;
                    }
                    .header-middle__logo-link {
                        cursor: pointer;
                    }
                    .header-middle__icons {
                        float: right;
                        padding-left: 4px;
                        padding-right: 16px;
                    }
                    .header-middle__icons > div {
                        margin-right: -15px;
                        margin-left: -10px;
                        display: inline-block;
                    }
                    .search-icon {
                        position: absolute;
                        right: -10px;
                        top: 7px;
                    }
                    .header-middle__search {
                        display: flex;
                        align-items: center;
                        float: right;
                        position: relative;
                    }
                `}
            </style>
            <style global jsx>
                {`
                    .header-small {
                        position: fixed;
                        top: 0;
                        width: 100%;
                        height: 80px !important;
                        z-index: 100;
                        background: #fff;
                        box-shadow: 0 20px 30px 0 rgba(0,0,0,.05);
                    }
                    .header-small .header-top{
                        display: none;
                    }
                    .header-small .menu-category{
                        display: none;
                    }
                    .header-small .header-small__menu {
                        display: block;
                    }

                `}
            </style>
        </div>
    );
};

export default ViewTopNavigation;
