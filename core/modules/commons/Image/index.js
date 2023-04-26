/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import { generateThumborUrl, getImageFallbackUrl } from '@helpers/image';
import React, { useEffect, useState } from 'react';
import { BREAKPOINTS } from '@theme_vars';
import LazyImage from './LazyImage';

const CustomImage = ({
    src,
    width = 500,
    height = 500,
    srcMobile,
    widthMobile = 300,
    heightMobile = 300,
    magezon,
    classContainer = '',
    styleContainer: initStyleContainer = {},
    className = '',
    alt = 'Image',
    quality,
    style = {},
    lazy = true,
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
    const thumborUrl = storeConfig && storeConfig.pwa && storeConfig.pwa.thumbor_url;
    const imageUrl = generateThumborUrl(src, width, height, enable, useHttpsOrHttp, thumborUrl, quality);
    const imageUrlMobile = generateThumborUrl(srcMobile, widthMobile, heightMobile, enable, useHttpsOrHttp, thumborUrl, quality);
    const [imgSource, setImgSource] = useState(imageUrl);
    const [imgSourceMobile, setImgSourceMobile] = useState(imageUrlMobile);

    let styleContainer = {
        width: '100%',
        position: 'relative',
        // paddingTop: `${(height / width) * 100}%`,
        overflow: 'hidden',
        display: 'block',
        ...initStyleContainer,
    };
    let styleImage = {
        top: '0',
        left: '0',
        objectFit: 'cover',
    };

    if (magezon) {
        styleContainer = {
            width: 'fit-content',
            overflow: 'hidden',
            display: 'block',
        };
        styleImage = {
            maxWidth: '100%',
            maxHeight: '100%',
        };
    }

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onerror = () => console.log('Original Image Loading is error, falling back to provided srcset'); // setImgSource(`${basePath}/assets/img/placeholder.png`);
        img.onload = () => setImgSource(imageUrl);
        if (srcMobile) {
            const mobileImg = new Image();
            mobileImg.src = imageUrlMobile;
            mobileImg.onerror = () => console.log('Original Image Loading is error, falling back to provided srcset'); // setImgSourceMobile(`${basePath}/assets/img/placeholder.png`);
            mobileImg.onload = () => setImgSourceMobile(imageUrlMobile);
        }
    }, [imageUrl, imageUrlMobile]);

    return (
        <span className={classContainer} style={styleContainer}>
            <picture>
                { srcMobile ? (
                    <>
                        <source srcSet={imgSourceMobile} media={`(max-width: ${BREAKPOINTS.sm - 1}px)`} type="image/webp" />
                        <source srcSet={getImageFallbackUrl(imgSourceMobile)} media={`(max-width: ${BREAKPOINTS.sm - 1}px)`} type="image/jpeg" />
                        <source srcSet={imgSource} media={`(min-width: ${BREAKPOINTS.sm}px)`} type="image/webp" />
                        <source srcSet={getImageFallbackUrl(imgSource)} media={`(min-width: ${BREAKPOINTS.sm}px)`} type="image/jpeg" />
                    </>
                ) : (
                    <>
                        <source srcSet={imgSource} type="image/webp" />
                        <source srcSet={getImageFallbackUrl(imgSource)} type="image/jpeg" />
                    </>
                )}
                {!lazy ? (
                    <img
                        data-pagespeed-no-defer
                        style={styleImage}
                        className={`img ${className}`}
                        src={getImageFallbackUrl(imgSource)}
                        alt={alt}
                        width={width}
                        height={height}
                        {...other}
                    />
                ) : (
                    <LazyImage style={styleImage} src={getImageFallbackUrl(imgSource)} alt={alt} width={width} height={height} />
                )}
            </picture>
        </span>
    );
};

export default CustomImage;
