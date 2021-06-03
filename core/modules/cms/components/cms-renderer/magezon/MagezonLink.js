/* eslint-disable consistent-return */
/* eslint-disable no-lone-blocks */
import parse from 'html-react-parser';
import { getLink } from '@core_modules/cms/helpers/magezonLinkGenerator';
import React, { memo } from 'react';
import Link from '@material-ui/core/Link';

const DOM_NAME = 'pwalink';

const MagezonLink = (props) => {
    const { link, children } = props;
    const contentLink = getLink(link);
    if (contentLink && contentLink !== '' && contentLink.includes(DOM_NAME)) {
        return parse(contentLink, {
            replace: (domNode) => {
                if (domNode.name === DOM_NAME && domNode.attribs) {
                    const {
                        type, url, title, extra, blank,
                    } = domNode.attribs;
                    switch (type) {
                    case 'custom':
                        return (
                            <Link
                                href={url + extra}
                                target={(blank === true || blank === 'true' ? '_blank' : '_self')}
                                color="inherit"
                                underline="none"
                            >
                                { children || title }
                            </Link>
                        );
                    case 'product':
                        return (
                            <Link
                                href="/"
                                target={(blank === true || blank === 'true' ? '_blank' : '_self')}
                                color="inherit"
                                underline="none"
                            >
                                { children || title }
                            </Link>
                        );
                    case 'category':
                        return (
                            <Link
                                href="/"
                                target={(blank === true || blank === 'true' ? '_blank' : '_self')}
                                color="inherit"
                                underline="none"
                            >
                                { children || title }
                            </Link>
                        );
                    case 'page':
                        return (
                            <Link
                                href="/"
                                target={(blank === true || blank === 'true' ? '_blank' : '_self')}
                                color="inherit"
                                underline="none"
                            >
                                { children || title }
                            </Link>
                        );
                    default:
                        return null;
                    }
                }
            },
        });
    }
    return children;
};

const notRenderIf = (prevProps, nextProps) => prevProps.content === nextProps.link;

export default memo(MagezonLink, notRenderIf);
