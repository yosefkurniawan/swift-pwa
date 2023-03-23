/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import { basePath } from '@config';
import { generateThumborUrl, getImageFallbackUrl } from '@helpers/image';
import React, { useEffect, useState } from 'react';
import LazyImage from './LazyImage';

const CustomImage = ({
    src,
    width = 500,
    height = 500,
    magezon,
    classContainer = '',
    className = '',
    alt = 'Image',
    quality = 100,
    style = {},
    lazy = false,
    storeConfig = {},
    ...other
}) => {
    // comment because unused
    // if (storeConfig) {
    //     if (storeConfig.pwa === undefined) {
    //         // console.log(storeConfig);
    //     }
    // }
    const enable = storeConfig && storeConfig.pwa && storeConfig.pwa.thumbor_enable;
    const useHttpsOrHttp = storeConfig && storeConfig.pwa && storeConfig.pwa.thumbor_https_http;
    const url = storeConfig && storeConfig.pwa && storeConfig.pwa.thumbor_url;
    const imageUrl = generateThumborUrl(src, width, height, enable, useHttpsOrHttp, url);
    const [imgSource, setImgSource] = useState(imageUrl);

    const styleImage = magezon
        ? {
            maxWidth: '100%',
            maxHeight: '100%',
        }
        : {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            objectFit: 'cover',
        };

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onerror = () => setImgSource(`${basePath}/assets/img/placeholder.png`);
        img.onload = () => setImgSource(imageUrl);
    }, [imageUrl]);

    return (
        <span
            className={classContainer}
            style={magezon ? {
                width: 'fit-content',
                overflow: 'hidden',
                display: 'block',
            } : {
                backgroundColor: '#eee',
                width: '100%',
                position: 'relative',
                paddingTop: `${(height / width) * 100}%`,
                overflow: 'hidden',
                display: 'block',
            }}
        >
            <picture>
                <source srcSet={imgSource} type="image/webp" />
                <source srcSet={getImageFallbackUrl(imgSource)} type="image/jpeg" />
                {!lazy ? (
                    <img data-pagespeed-no-defer style={styleImage} className={`img ${className}`} src={imgSource} alt={alt} {...other} />
                ) : (
                    <LazyImage style={styleImage} src={imgSource} alt={alt} />
                )}
            </picture>
        </span>
    );
};

export default CustomImage;
