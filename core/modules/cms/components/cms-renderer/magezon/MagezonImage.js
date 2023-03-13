import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import { getImageFallbackUrl } from '@helpers/image';

const DOM_NAME = 'pwa';

const MagezonImage = (props) => {
    const { getImgThumbor, slide_link } = props;
    const slidelink = slide_link?.includes('{{mgzlink') ? slide_link.replace('{{mgzlink', '<pwa').slice(0, -2).concat(' />') : '<pwa url="nolink" />';

    return parse(slidelink, {
        replace: (domNode) => {
            if (domNode.name === DOM_NAME && domNode.attribs) {
                switch (domNode.attribs.type) {
                case 'custom':
                    return (
                        <Link href={`/${domNode.attribs.url}`} as={domNode.attribs.title}>
                            <a target={domNode.attribs.blank === 'true' ? '_blank' : '_self'}>
                                <picture>
                                    <source srcSet={getImgThumbor} type="image/webp" />
                                    <source srcSet={getImageFallbackUrl(getImgThumbor)} type="image/jpeg" />
                                    <img
                                        data-pagespeed-no-defer
                                        className="img-bg"
                                        src={getImgThumbor}
                                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                                        alt="gambar"
                                        width="100%"
                                        height="100%"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </picture>
                            </a>
                        </Link>
                    );
                case 'category':
                    return (
                        <Link href={`/${domNode.attribs.url_path}`} as={domNode.attribs.url_path}>
                            <a target={domNode.attribs.blank === 'true' ? '_blank' : '_self'}>
                                <picture>
                                    <source srcSet={getImgThumbor} type="image/webp" />
                                    <source srcSet={getImageFallbackUrl(getImgThumbor)} type="image/jpeg" />
                                    <img
                                        data-pagespeed-no-defer
                                        className="img-bg"
                                        src={getImgThumbor}
                                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                                        alt="gambar"
                                        width="100%"
                                        height="100%"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </picture>
                            </a>
                        </Link>
                    );
                case 'product':
                    return (
                        <Link href={`/${domNode.attribs.url_key}`} as={domNode.attribs.url_key}>
                            <a target={domNode.attribs.blank === 'true' ? '_blank' : '_self'}>
                                <picture>
                                    <source srcSet={getImgThumbor} type="image/webp" />
                                    <source srcSet={getImageFallbackUrl(getImgThumbor)} type="image/jpeg" />
                                    <img
                                        data-pagespeed-no-defer
                                        className="img-bg"
                                        src={getImgThumbor}
                                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                                        alt="gambar"
                                        width="100%"
                                        height="100%"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </picture>
                            </a>
                        </Link>
                    );
                default:
                    return (
                        <picture>
                            <source srcSet={getImgThumbor} type="image/webp" />
                            <source srcSet={getImageFallbackUrl(getImgThumbor)} type="image/jpeg" />
                            <img
                                data-pagespeed-no-defer
                                className="img-bg"
                                src={getImgThumbor}
                                onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                                alt="gambar"
                                width="100%"
                                height="100%"
                                style={{ objectFit: 'cover' }}
                            />
                        </picture>
                    );
                }
            }
            return null;
        },
    });
};

export default MagezonImage;
