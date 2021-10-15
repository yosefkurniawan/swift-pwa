/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import React from 'react';
import { generateThumborUrl, getImageFallbackUrl } from '@helpers/image';
import LazyImage from './LazyImage';

const imgError = (image) => {
    image.onerror = '';
    image.src = '/assets/img/placeholder.png';
    return true;
};

const Image = ({
    src, width = 500, height = 500, magezon,
    classContainer = '', className = '', alt = 'Image', quality = 100, style = {}, lazy = false, ...other
}) => {
    const imageUrl = generateThumborUrl(src, width, height);
    const styleImage = magezon ? {
        maxWidth: '100%',
        maxHeight: '100%',
    } : {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
    };

    return (
        <div
            className={classContainer}
            style={magezon ? {
                width: 'fit-content',
                overflow: 'hidden',
            } : {
                backgroundColor: '#eee',
                width: '100%',
                position: 'relative',
                paddingTop: `${(height / width) * 100}%`,
                overflow: 'hidden',
            }}
        >
            <picture>
                <source srcSet={imageUrl} type="image/webp" />
                <source srcSet={getImageFallbackUrl(imageUrl)} type="image/jpeg" />
                {!lazy ? (
                    <img
                        data-pagespeed-no-defer
                        style={styleImage}
                        className={`img ${className}`}
                        src={imageUrl}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                        alt={alt}
                        {...other}
                    />
                ) : (
                    <LazyImage
                        style={styleImage}
                        src={imageUrl}
                        alt={alt}
                    />
                )}
            </picture>
        </div>
    );
};

export default Image;
