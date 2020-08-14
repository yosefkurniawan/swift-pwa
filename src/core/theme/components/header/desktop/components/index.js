/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { WHITE, PRIMARY } from '@theme/colors';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBagIcon from '@core/cart/plugin/ShoppingBag';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';

const ViewTopNavigation = (props) => {
    const {
        storeConfig, handleSearch, searchByClick, setValue, value,
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
                        <nav>
                            <ul>
                                <li><a href="#">Inicio</a></li>
                                <li>
                                    <a href="#">Tutoriais</a>
                                    <ul>
                                        <li><a href="#">Php</a></li>
                                        <li><a href="#">Java</a></li>
                                        <li>
                                            <a href="#">SQL</a>
                                            <ul>
                                                <li><a href="#">PostgreSQL</a></li>
                                                <li><a href="#">MySql</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">Redes Sociais</a>
                                    <ul>
                                        <li><a href="#">Facebook</a></li>
                                        <li><a href="#">Twitter</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Sobre</a></li>
                            </ul>
                        </nav>
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
                    
                    ul {
                        position: absolute;
                        margin: 0;
                        list-style:none;
                        background: ${WHITE};
                        padding: 0;
                    }
                    
                    li {
                        display: inline-block;
                        padding: 5px 10px;
                        position: relative;
                    }
                    li:hover > ul {
                        display: block;
                    }
                    ul ul {
                        position: absolute;
                        display: none;
                        margin: 0;
                        padding: 5px 10px;
                        z-index: 999;
                        box-shadow: 0 5px 10px rgba(0,0,0,.15);
                    }
                    ul ul li {
                        display: block;
                    }
                    
                    ul ul ul {
                        position: absolute;
                        top: 0;
                        left: 100%;
                    }
                    a {
                        color: ${PRIMARY};
                        text-decoration: none;
                    }

                    a:hover {
                        border-bottom: 1px dashed #FFF;
                    }
                `}
            </style>
        </header>
    );
};

export default ViewTopNavigation;
