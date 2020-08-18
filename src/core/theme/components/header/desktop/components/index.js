/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBagIcon from '@core/cart/plugin/ShoppingBag';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';
import Menu from './menu';

const ViewTopNavigation = (props) => {
    const {
        storeConfig, handleSearch, searchByClick, setValue, value, category, loading,
    } = props;
    return (
        <header>
            <main>
                <div className="row header-top">
                    <div className="col-xs-6">
                        <div className="box header-top__logo">
                            <Link href="/">
                                <img
                                    className="header-top__logo-link"
                                    src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="box">
                            <div className="header-top__bag">
                                <ShoppingBagIcon withLink />
                            </div>
                            <div className="header-top__search">
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
                        height: 150px;
                    }
                    .header-top {
                        height: 85px;
                        padding-top: 10px;
                    }
                    .header-top__logo-link {
                        cursor: pointer;
                    }
                    .header-top__bag {
                        float: right;
                    }
                    .search-icon {
                        position: absolute;
                        right: -10px;
                        top: 7px;
                    }
                    .header-top__search {
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
