import React from 'react';
import Link from 'next/link';
import setDefaultWhenEmpty from '@helper_checkimagesrc';
import Thumbor from '@common_image';
import useStyles from '@common_slider/Banner/style';

/**
 slug page need props 'href' & 'as' to prevent browser reloading
 *isSlug == true => <link href="/[...slug]" as={link} />
 *isSlug == false => <link href={link} />
*/

const ImageSlide = ({
    imageUrl = '', link = '#', isSlug = true, width, height, storeConfig,
}) => {
    const styles = useStyles();
    const href = link && link[0] === '/' ? link : `/${link}`;

    let defaultWidth = storeConfig?.pwa?.home_slider_desktop_width;
    let defaultHeight = storeConfig?.pwa?.home_slider_desktop_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    return (
        <Link
            href={isSlug ? '/[...slug]' : href}
            {...(isSlug && { as: href })}
        >
            <a>
                <Thumbor
                    src={setDefaultWhenEmpty(imageUrl)}
                    alt={href}
                    width={width || defaultWidth}
                    height={height || defaultHeight}
                    quality={100}
                    className={styles.imageSlider}
                />
            </a>
        </Link>
    );
};

export default ImageSlide;
