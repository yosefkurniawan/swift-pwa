/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import React from 'react';
import { generateThumborUrl } from '@helpers/image';
import LazyImage from './LazyImage';

const imgError = (image) => {
    image.onerror = '';
    image.src = '/assets/img/placeholder.png';
    return true;
};

const Image = ({
    src, width = 500, height = 500,
    classContainer = '', className = '', alt = 'Image', quality = 100, style = {}, lazy = false, ...other
}) => (
    <div
        className={classContainer}
        // ref={imgContainer}
        style={{
            width: 'fit-content',
            overflow: 'hidden',
        }}
    >
        {!lazy ? (
            <img
                data-pagespeed-no-defer
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                }}
                className={`img ${className}`}
                src={generateThumborUrl(src, width, height)}
                onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                alt={alt}
                {...other}
            />
        ) : (
            <LazyImage
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                }}
                src={generateThumborUrl(src, width, height)}
                alt={alt}
            />
        )}
    </div>
);

export default Image;
