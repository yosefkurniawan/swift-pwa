/* eslint-disable no-nested-ternary */
import React from 'react';
import Link from 'next/link';
import { features } from '@config';
import classNames from 'classnames';
import useStyles from './style';
import Thumbor from './Thumbor';

/**
 slug page need props 'href' & 'as' to prevent browser reloading
 *isSlug == true => <link href="/[...slug]" as={link} />
 *isSlug == false => <link href={link} />
*/

const ImageSlide = ({
    width, height, imageUrl = '', link = '#', isSlug = true, mobileImageUrl = '', noLink,
    contentWidth, customClass = '',
}) => {
    const styles = useStyles();
    const href = link && link[0] === '/' ? link : `/${link}`;
    if (noLink) {
        return (
            <Thumbor
                mobileImageUrl={mobileImageUrl}
                imageUrl={imageUrl}
                alt={href}
                widthMobile={width || features.imageSize.homeSlider.mobile.width}
                heightMobile={height || features.imageSize.homeSlider.mobile.height}
                widthDesktop={width || features.imageSize.homeSlider.desktop.width}
                heightDesktop={height || features.imageSize.homeSlider.desktop.height}
                quality={100}
                className={
                    contentWidth === 'auto'
                        ? classNames(styles.imageSliderAuto, styles.imageSlider, customClass)
                        : classNames(styles.imageSlider, customClass)
                }
            />
        );
    }
    return (
        <Link href={isSlug ? '/[...slug]' : href} {...(isSlug && { as: href })}>
            <a>
                <Thumbor
                    mobileImageUrl={mobileImageUrl}
                    imageUrl={imageUrl}
                    alt={href}
                    widthMobile={features.imageSize.homeSlider.mobile.width}
                    heightMobile={features.imageSize.homeSlider.mobile.height}
                    widthDesktop={features.imageSize.homeSlider.desktop.width}
                    heightDesktop={features.imageSize.homeSlider.desktop.height}
                    quality={100}
                    className={contentWidth === 'auto' ? classNames(styles.imageSliderAuto, styles.imageSlider) : styles.imageSlider}
                    contentWidth={contentWidth}
                    customClass={customClass}
                />
            </a>
        </Link>
    );
};

export default ImageSlide;
