import React from 'react';
import Link from 'next/link';
import useStyles from './style';
import setDefaultWhenEmpty from '../../../helpers/checkImageSrc';
import Thumbor from '../../Image/thumbor';


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
                width={960}
                height={1120}
                className={styles.imageSlider}
            />
        </Link>
    );
};

export default ImageSlide;
