/* eslint-disable no-nested-ternary */
/* eslint-disable no-mixed-operators */
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import useStyles from '@common_slick/Banner/style';
import Thumbor from '@common_image';
import ProductVideo from '@common_slick/Banner/productVideo';

/**
 slug page need props 'href' & 'as' to prevent browser reloading
 *isSlug == true => <link href="/[...slug]" as={link} />
 *isSlug == false => <link href={link} />
*/

const ImageSlide = ({
    width,
    height,
    imageUrl = '',
    link = '#',
    isSlug = true,
    mobileImageUrl = '',
    contentWidth,
    video,
    videoUrl,
    storeConfig,
    alt = '',
    urlEmbed,
    noLink = false,
    lazy,
}) => {
    const styles = useStyles();
    const href = (link && link.includes('http://')) || link.includes('https://') ? link : link[0] === '/' ? link : `/${link}`;

    if (urlEmbed || video) {
        if (urlEmbed || imageUrl && video) {
            return <ProductVideo urlEmbed={urlEmbed} video={video} />;
        }
        if (!imageUrl && video) {
            return <ProductVideo video={video} />;
        }
    }
    if (videoUrl) {
        if (videoUrl.video_url) {
            return <ProductVideo videoUrl={videoUrl} />;
        }
    }
    return (
        <>
            {
                noLink
                    ? (
                        <a>
                            <Thumbor
                                src={imageUrl}
                                srcMobile={mobileImageUrl}
                                width={width || storeConfig?.pwa?.home_slider_desktop_width}
                                height={height || storeConfig?.pwa?.home_slider_desktop_height}
                                widthMobile={width || storeConfig?.pwa?.home_slider_mobile_width}
                                heightMobile={height || storeConfig?.pwa?.home_slider_mobile_height}
                                alt={alt}
                                className={
                                    classNames(styles.imageSlider, styles.thumborImage, {
                                        [styles.imageSliderAuto]: contentWidth === 'auto',
                                        [styles.imageSlider]: contentWidth === 'auto',
                                    })
                                }
                                storeConfig={storeConfig}
                                lazy={lazy}
                                slickBanner
                            />
                        </a>
                    )
                    : (
                        <Link href={isSlug ? '/[...slug]' : href} {...(isSlug && { as: href })} prefetch={false}>
                            <a>
                                <Thumbor
                                    src={imageUrl}
                                    srcMobile={mobileImageUrl}
                                    width={width || storeConfig?.pwa?.home_slider_desktop_width}
                                    height={height || storeConfig?.pwa?.home_slider_desktop_height}
                                    widthMobile={width || storeConfig?.pwa?.home_slider_mobile_width}
                                    heightMobile={height || storeConfig?.pwa?.home_slider_mobile_height}
                                    alt={alt}
                                    className={
                                        classNames(styles.imageSlider, styles.thumborImage, {
                                            [styles.imageSliderAuto]: contentWidth === 'auto',
                                            [styles.imageSlider]: contentWidth === 'auto',
                                        })
                                    }
                                    storeConfig={storeConfig}
                                    lazy={lazy}
                                    slickBanner
                                />
                            </a>
                        </Link>
                    )
            }
        </>

    );
};

export default ImageSlide;
