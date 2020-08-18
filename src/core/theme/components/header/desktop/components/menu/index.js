/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { WHITE, PRIMARY } from '@theme/colors';

const generateLevel3 = (data) => data.map((val, idx) => (
    <li key={idx}>
        <Link href="/[...slug]" as={`/${val.url_path}`}>
            <a>{val.name}</a>
        </Link>
        <style jsx>
            {`ul {
                    position: absolute;
                    margin: 0;
                    list-style:none;
                    background: ${WHITE};
                    padding: 0;
                    font-size: 14px;
                    text-transform: uppercase;
                    font-weight: 600;
                    font-family: Montserrat !important;
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
                }`}
        </style>
    </li>
));

const generateLevel2 = (data) => data.map((val, idx) => (
    <li key={idx}>
        <Link href="/[...slug]" as={`/${val.url_path}`}>
            <a>{val.name}</a>
        </Link>
        {val.children && val.children.length > 0 ? <ul>{generateLevel3(val.children)}</ul> : null}
        <style jsx>
            {`ul {
                    position: absolute;
                    margin: 0;
                    list-style:none;
                    background: ${WHITE};
                    padding: 0;
                    font-size: 14px;
                    text-transform: uppercase;
                    font-weight: 600;
                    font-family: Montserrat !important;
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
                }`}
        </style>
    </li>
));

const Menu = (props) => {
    const { category } = props;
    const data = category.categoryList[0];
    return (
        <nav>
            <ul>
                {data.children.map((val, idx) => {
                    if (val.include_in_menu) {
                        return (
                            <li key={idx}>
                                <Link href="/[...slug]" as={`/${val.url_path}`}>
                                    <a>{val.name}</a>
                                </Link>
                                {val.children.length > 0 ? <ul>{generateLevel2(val.children)}</ul> : null}
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
            <style jsx>
                {`ul {
                    position: absolute;
                    margin: 0;
                    list-style:none;
                    background: ${WHITE};
                    padding: 0;
                    font-size: 14px;
                    text-transform: uppercase;
                    font-weight: 600;
                    font-family: Montserrat !important;
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
                }`}
            </style>
        </nav>
    );
};

export default Menu;
