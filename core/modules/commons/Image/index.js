/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import { basePath } from '@config';
import { generateThumborUrl, getImageFallbackUrl } from '@helpers/image';
import { getHost, getHostProd } from '@helpers/config';
import React, { useEffect, useState, useCallback } from 'react';
import { BREAKPOINTS } from '@theme_vars';
import Head from 'next/head';

function gcd(a, b) {
    return (b === 0) ? a : gcd(b, a % b);
}

const Container = ({
    children, enable, className, style,
}) => (enable
    ? <span className={className} style={style}>{children}</span>
    : <>{children}</>);

const CustomImage = ({
    src,
    width = 0,
    height = 0,
    srcMobile,
    widthMobile = 0,
    heightMobile = 0,
    magezon,
    useContainer = true,
    classContainer = '',
    styleContainer: initStyleContainer = {},
    className = '',
    alt = 'Image',
    quality,
    // style = {},
    lazy = true,
    storeConfig = {},
    slickBanner = false,
    deviceType,
    preload = false,
    ...other
}) => {
    // console.log('deviceType', deviceType);
    const enable = storeConfig && storeConfig.pwa && storeConfig.pwa.thumbor_enable;
    const useHttpsOrHttp = storeConfig && storeConfig.pwa && storeConfig.pwa.thumbor_https_http;
    const thumborUrl = storeConfig && storeConfig.pwa && storeConfig.pwa.thumbor_url;
    const imageUrl = generateThumborUrl(src, width, height, enable, useHttpsOrHttp, thumborUrl, quality);
    const imageUrlMobile = srcMobile ? generateThumborUrl(srcMobile, widthMobile, heightMobile, enable, useHttpsOrHttp, thumborUrl, quality) : null;

    // generate blurry image loader
    let draftWidth = parseInt(width, 10);
    let draftHeight = parseInt(height, 10);
    let draftWidthMobile = parseInt(widthMobile, 10);
    let draftHeightMobile = parseInt(heightMobile, 10);
    if (width || height) {
        const r = gcd(draftWidth, draftHeight);
        const rMob = gcd(draftWidthMobile, draftHeightMobile);
        draftWidth /= r;
        draftHeight /= r;
        draftWidthMobile /= rMob;
        draftHeightMobile /= rMob;

        // minimum 5px
        if (draftWidth < 5 && draftHeight < 5) {
            draftWidth *= 3;
            draftHeight *= 3;
        }
        // minimum 5px
        if (draftWidthMobile < 5 && draftHeightMobile < 5) {
            draftWidthMobile *= 3;
            draftHeightMobile *= 3;
        }
    } else {
        // if dimension is not set, generate default draft with dimension width 5px, auto height
        draftWidthMobile = 5;
        draftHeightMobile = 0;
    }
    const draft = generateThumborUrl(src, draftWidth, draftHeight, enable, useHttpsOrHttp, thumborUrl, 70, 'full-fit-in', 70);
    const draftMobile = generateThumborUrl(srcMobile, draftWidthMobile, draftHeightMobile, enable, useHttpsOrHttp, thumborUrl, 70, 'full-fit-in', 70);
    const [imgSource, setImgSource] = useState(!lazy ? imageUrl : draft);
    const [imgSourceMobile, setImgSourceMobile] = useState(!lazy ? imageUrlMobile : draftMobile);

    let styleContainer = {
        width: '100%',
        position: 'relative',
        paddingTop: `${(height / width) * 100}%`,
        overflow: 'hidden',
        display: 'block',
        ...initStyleContainer,
    };
    let styleImage = {
        width: '100%',
        height: '100%',
        position: 'absolute',
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
            height: 'auto',
        };
    }

    if (slickBanner) {
        styleContainer = {};
        styleImage = {};
    }

    const onLoad = useCallback((event) => {
        event.target.classList.add('loaded');
    }, []);

    const onError = useCallback((event) => {
        event.target.classList.add('has-error');
    }, []);

    useEffect(() => {
        const placeholder = !getHost().includes('localhost')
            ? generateThumborUrl(
                `${getHost()}/assets/img/placeholder.png`,
                width,
                height,
                enable,
                useHttpsOrHttp,
                thumborUrl,
                quality,
            ) : generateThumborUrl(
                `${getHostProd()}/assets/img/placeholder.png`,
                widthMobile,
                heightMobile,
                enable,
                useHttpsOrHttp,
                thumborUrl,
                quality,
            );
        const img = new Image();
        img.src = imageUrl;
        img.onerror = () => setImgSource(placeholder);
        img.onload = () => setImgSource(imageUrl);
        if (srcMobile) {
            const placeholderMobile = !getHost().includes('localhost')
                ? generateThumborUrl(
                    `${getHost()}/assets/img/placeholder.png`,
                    widthMobile,
                    heightMobile,
                    enable,
                    useHttpsOrHttp,
                    thumborUrl,
                    quality,
                ) : generateThumborUrl(
                    `${getHostProd()}/assets/img/placeholder.png`,
                    widthMobile,
                    heightMobile,
                    enable,
                    useHttpsOrHttp,
                    thumborUrl,
                    quality,
                );
            const mobileImg = new Image();
            mobileImg.src = imageUrlMobile;
            mobileImg.onerror = () => setImgSourceMobile(placeholderMobile);
            mobileImg.onload = () => setImgSourceMobile(imageUrlMobile);
        }
    }, [imageUrl, imageUrlMobile]);

    const imgTagDimensions = {
        width: !deviceType?.isMobile ? width || null : widthMobile || null,
        height: !deviceType?.isMobile ? height || null : heightMobile || null,
    };

    return (
        <Container enable={useContainer} className={classContainer} style={styleContainer}>
            {
                preload && (
                    <Head>
                        <link rel="preload" as="image" href={imgSource} />
                        { srcMobile && <link rel="preload" as="image" href={imgSourceMobile} />}
                    </Head>
                )
            }
            <picture>
                { srcMobile ? (
                    <>
                        <source srcSet={imgSourceMobile} media={`(max-width: ${BREAKPOINTS.sm - 1}px)`} type="image/webp" />
                        <source
                            srcSet={getImageFallbackUrl(imgSourceMobile)}
                            media={`(max-width: ${BREAKPOINTS.sm - 1}px)`}
                            type="image/jpeg"
                        />
                        <source srcSet={imgSource} media={`(min-width: ${BREAKPOINTS.sm}px)`} type="image/webp" />
                        <source srcSet={getImageFallbackUrl(imgSource)} media={`(min-width: ${BREAKPOINTS.sm}px)`} type="image/jpeg" />
                    </>
                ) : (
                    <>
                        <source srcSet={imgSource} type="image/webp" />
                        <source srcSet={getImageFallbackUrl(imgSource)} type="image/jpeg" />
                    </>
                )}
                <img
                    data-pagespeed-no-defer={!lazy}
                    style={styleImage}
                    className={`img ${className}`}
                    src={getImageFallbackUrl(imgSource)}
                    alt={alt}
                    // width={width !== 0 && desktop ? width : widthMobile}
                    // height={height !== 0 && desktop ? height : heightMobile}
                    {...imgTagDimensions}
                    onLoad={lazy ? onLoad : null}
                    onError={lazy ? onError : null}
                    {...other}
                />
                <style jsx>
                    {`
                            // Add a smooth animation on loading
                            @keyframes loaded {
                                0% {
                                opacity: 0.1;
                                }
                                100% {
                                opacity: 1;
                                }
                            }
        
                            // I use utilitary classes instead of props to avoid style regenerating
                            img.loaded:not(.has-error) {
                                animation: loaded 300ms ease-in-out;
                            }
        
                            img.has-error {
                                // fallback to placeholder image on error
                                content: url(${basePath}/assets/img/placeholder.png);
                            }
                        `}
                </style>
            </picture>
        </Container>
    );
};

export default CustomImage;
