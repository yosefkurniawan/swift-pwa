/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import { basePath } from '@config';
import { generateThumborUrl, getImageFallbackUrl } from '@helpers/image';
import { getHost, getHostProd } from '@helpers/config';

import React, { useEffect, useState, useCallback } from 'react';
import { BREAKPOINTS } from '@theme_vars';
import Skeleton from '@common_skeleton';

const dummyPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAQAAADVobXoAAAAEElEQVR42mM8858BDBhhDAArAgOZPzQZFwAAAABJRU5ErkJggg==';

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
    const imageUrlMobile = srcMobile ? generateThumborUrl(srcMobile, widthMobile, heightMobile, enable, useHttpsOrHttp, thumborUrl, quality) : null;
    const [imgSource, setImgSource] = useState(!lazy ? imageUrl : dummyPlaceholder);
    const [imgSourceMobile, setImgSourceMobile] = useState(!lazy ? imageUrl : dummyPlaceholder);

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
            height: 'auto',
        };
    }

    const onLoad = useCallback((event) => {
        event.target.classList.add('loaded');
    }, []);

    const onError = useCallback((event) => {
        event.target.classList.add('has-error');
    }, []);

    useEffect(() => {
        const placeholder = !getHost().includes('localhost')
            ? generateThumborUrl(`${getHost()}/assets/img/placeholder.png`, width, height, enable, useHttpsOrHttp, thumborUrl, quality)
            : generateThumborUrl(`${getHostProd()}/assets/img/placeholder.png`, width, height, enable, useHttpsOrHttp, thumborUrl, quality);
        const img = new Image();
        img.src = imageUrl;
        img.onerror = () => setImgSource(placeholder);
        img.onload = () => setImgSource(imageUrl);// setImgSource(imageUrl);
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
            mobileImg.onload = () => setImgSourceMobile(imageUrlMobile); // setImgSourceMobile(imageUrlMobile);
        }
    }, [imageUrl, imageUrlMobile]);

    return (
        <Container enable={useContainer} className={className} style={styleContainer}>
            { lazy && imgSource === dummyPlaceholder
                ? (
                    <div style={{ maxWidth: '100%' }}>
                        <Skeleton
                            variant="rectangular"
                            xsStyle={{ height: srcMobile ? heightMobile : height, width: srcMobile ? widthMobile : width }}
                            mdStyle={{ height, width }}
                        />
                    </div>
                ) : (
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
                            width={width !== 0 ? width : null}
                            height={height !== 0 ? height : null}
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
                )}
        </Container>
    );
};

export default CustomImage;
