/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import parse, { domToReact } from 'html-react-parser';

const GlobalPromoMessage = (props) => {
    const {
        data,
    } = props;

    /* eslint-disable */
    const options = {
        replace: ({ attribs, children }) => {
            if (attribs) {
                if (attribs.id === 'main') {
                    return <h1 style={{ fontSize: 42 }}>{domToReact(children, options)}</h1>;
                }

                if (attribs.class === 'prettify') {
                    return (
                        <span style={{ color: 'hotpink' }}>
                            {domToReact(children, options)}
                        </span>
                    );
                }
            }
        }
    };
    /* eslint-enable */

    if (data && data.cmsBlocks && data.cmsBlocks.items[0] && data.cmsBlocks.items[0].content) {
        const { content } = data.cmsBlocks.items[0];
        return (
            <div>
                {parse(content, options)}
                <style jsx>
                    {`
                        ul, li {
                            list-style: none;
                            margin: 0;
                            padding: 0;
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
                            background: #fff;
                            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
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
                            color: #000;
                            text-decoration: none;
                        }
    
                        a:hover {
                            border-bottom: 1px dashed #fff;
                            color: #b9acac;
                        }

                        .carousel {
                            position: relative;
                            padding-top: 75%;
                            filter: drop-shadow(0 0 10px #0003);
                            perspective: 100px;
                        }
                    `}
                </style>
            </div>
        );
    }
    return null;
};
export default GlobalPromoMessage;
