import React from 'react';
import Link from 'next/link';
import { features } from '@config';
import setDefaultWhenEmpty from '@helpers/checkImageSrc';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './style';
import Thumbor from './Thumbor';

/**
 slug page need props 'href' & 'as' to prevent browser reloading
 *isSlug == true => <link href="/[...slug]" as={link} />
 *isSlug == false => <link href={link} />
*/

const ImageSlide = ({
    imageUrl = '', link = '#', isSlug = true, width, height, mobileImageUrl = '', noLink,
}) => {
    const styles = useStyles();
    const href = link && link[0] === '/' ? link : `/${link}`;
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('sm'));
    const defualtWidth = desktop ? features.imageSize.homeSlider.desktop.width : features.imageSize.homeSlider.mobile.width;
    const defualtHeight = desktop ? features.imageSize.homeSlider.desktop.height : features.imageSize.homeSlider.mobile.height;
    const defaultImageUrl = desktop ? setDefaultWhenEmpty(imageUrl) : setDefaultWhenEmpty(mobileImageUrl);
    if (noLink) {
        return (
            <Thumbor
                src={defaultImageUrl}
                alt={href}
                width={width || defualtWidth}
                height={height || defualtHeight}
                quality={100}
                className={styles.imageSlider}
            />
        );
    }

    return (
        <Link
            href={isSlug ? '/[...slug]' : href}
            {...(isSlug && { as: href })}
        >
            <a>
                <Thumbor
                    src={defaultImageUrl}
                    alt={href}
                    width={width || defualtWidth}
                    height={height || defualtHeight}
                    quality={100}
                    className={styles.imageSlider}
                />
            </a>
        </Link>
    );
};

export default ImageSlide;
