import React from 'react';
import Link from 'next/link';
import useStyles from './style';
import setDefaultWhenEmpty from '../../../helpers/checkImageSrc';

const ImageSlide = ({ url = '', link = '#', height = '100%' }) => {
    const styles = useStyles();
    const bgImg = {
        backgroundImage: `url(${setDefaultWhenEmpty(url)})`,
        height,
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
    };
    return (
        <Link href={link}>
            <div style={bgImg} className={styles.imageSlider} />
        </Link>
    );
};

export default ImageSlide;
