/* eslint-disable no-nested-ternary */
/* eslint-disable no-mixed-operators */
import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import ProductVideo from '@common_slick/Banner/productVideo';
import Thumbor from '@common_image';
import useStyles from '@common_slick/Banner/style';

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
    customClass = '',
    video,
    videoUrl,
    storeConfig,
    alt = '',
    urlEmbed,
    noLink = false,
}) => {
    const styles = useStyles();
    const href = (link && link.includes('http://')) || link.includes('https://') ? link : link[0] === '/' ? link : `/${link}`;

    let imgSrc = imageUrl;
    let imgHeight = height || storeConfig?.pwa?.home_slider_desktop_height;
    let imgWidth = width || storeConfig?.pwa?.home_slider_desktop_width;

    if (mobileImageUrl) {
        imgSrc = mobileImageUrl;
        imgHeight = height || storeConfig?.pwa?.home_slider_mobile_height;
        imgWidth = width || storeConfig?.pwa?.home_slider_mobile_width;
    }

    if (urlEmbed || video) {
        if (urlEmbed || (imageUrl && video)) {
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
            {noLink ? (
                <a>
                    <Thumbor
                        src={imgSrc}
                        width={parseInt(imgWidth, 0)}
                        height={parseInt(imgHeight, 0)}
                        alt={alt}
                        className={contentWidth === 'auto' ? classNames(styles.imageSliderAuto, styles.imageSlider) : styles.imageSlider}
                        customClass={customClass}
                        storeConfig={storeConfig}
                    />
                </a>
            ) : (
                <Link href={isSlug ? '/[...slug]' : href} {...(isSlug && { as: href })}>
                    <a>
                        <Thumbor
                            src={imgSrc}
                            width={parseInt(imgWidth, 0)}
                            height={parseInt(imgHeight, 0)}
                            alt={alt}
                            className={contentWidth === 'auto' ? classNames(styles.imageSliderAuto, styles.imageSlider) : styles.imageSlider}
                            customClass={customClass}
                            storeConfig={storeConfig}
                        />
                    </a>
                </Link>
            )}
        </>
    );
};

export default ImageSlide;
