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
    src, width = 500, height = 500, magezon,
    classContainer = '', className = '', alt = 'Image', quality = 100, style = {}, lazy = false, ...other
}) => {
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
            // ref={imgContainer}
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
            {!lazy ? (
                <img
                    data-pagespeed-no-defer
                    style={styleImage}
                    className={`img ${className}`}
                    src={generateThumborUrl(src, width, height)}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                    alt={alt}
                    {...other}
                />
            ) : (
                <LazyImage
                    style={styleImage}
                    src={generateThumborUrl(src, width, height)}
                    alt={alt}
                />
            )}
        </div>
    );
};

export default Image;
