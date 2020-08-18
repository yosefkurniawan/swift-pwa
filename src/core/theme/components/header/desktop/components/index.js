/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBagIcon from '@core/cart/plugin/ShoppingBag';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';
import Menu from './category-menu';
import TopMenu from './top-menu';
import TopView from './top-menu/view';

const ViewTopNavigation = (props) => {
    const {
        storeConfig, handleSearch, searchByClick, setValue, value, category, loading, t, isLogin,
    } = props;
    return (
        <header>
            <div className="row header-top">
                <main>
                    <TopMenu t={t} isLogin={isLogin} TopView={TopView} />
                </main>
            </div>
            <main>
                <div className="row header-middle">
                    <div className="col-xs-6">
                        <div className="box header-middle__logo">
                            <Link href="/">
                                <img
                                    className="header-middle__logo-link"
                                    src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="box">
                            <div className="header-middle__bag">
                                <ShoppingBagIcon withLink />
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

                <div className="row">
                    <div className="col-xs-12">
                        {loading ? null : <Menu category={category} />}
                    </div>
                </div>

            </main>
            <style jsx>
                {`
                    header {
                        height: 170px;
                    }
                    .header-top {
                        height: 45px;
                        border-bottom: 1px solid #d6d6d6;
                        display: flex;
                        align-items: center;
                        padding: 10px 0;
                    }
                    .header-middle {
                        height: 75px;
                        padding-top: 10px;
                    }
                    .header-middle img {
                        width: 140px;
                    }
                    .header-middle__logo-link {
                        cursor: pointer;
                    }
                    .header-middle__bag {
                        float: right;
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
        </header>
    );
};

export default ViewTopNavigation;
