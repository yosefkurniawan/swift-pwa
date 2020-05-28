import React from 'react';
import Link from 'next/link';
import useStyles from './style';
import setDefaultWhenEmpty from '../../../helpers/checkImageSrc';

const ImageSlide = ({ imageUrl = '', link = '#' }) => {
    const styles = useStyles();
    return (
        <Link href={link}>
            <img src={setDefaultWhenEmpty(imageUrl)} alt={link} className={styles.imageSlider} />
        </Link>
    );
};

export default ImageSlide;
