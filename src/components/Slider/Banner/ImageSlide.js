import React from 'react';
import Link from 'next/link';
import useStyles from './style';

const ImageSlide = ({ src = '', link = '#', height = '100%' }) => {
    const styles = useStyles();
    const bgImg = {
        backgroundImage: `url(${src})`,
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
