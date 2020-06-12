import React from 'react';
import Link from 'next/link';
import { imageSize } from '@config';
import useStyles from './style';
import setDefaultWhenEmpty from '../../../helpers/checkImageSrc';
import Thumbor from '../../Image';


/**
 slug page need props 'href' & 'as' to prevent browser reloading
 *isSlug == true => <link href="/[...slug]" as={link} />
 *isSlug == false => <link href={link} />
*/


const ImageSlide = ({ imageUrl = '', link = '#', isSlug = true }) => {
    const styles = useStyles();
    const href = link && link[0] === '/' ? link : `/${link}`;
    return (
        <Link
            href={isSlug ? '/[...slug]' : href}
            {...(isSlug && { as: href })}
        >
            <Thumbor
                src={setDefaultWhenEmpty(imageUrl)}
                alt={href}
                width={imageSize.homeSlider.width}
                height={imageSize.homeSlider.height}
                quality={80}
                className={styles.imageSlider}
            />
        </Link>
    );
};

export default ImageSlide;
