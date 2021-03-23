/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import React from 'react';
import Image from 'next/image';
import { generateThumborUrl } from '@helpers/image';

const CustomImage = ({
    src,
    width = 500,
    height = 500,
    className = '',
    alt = 'Image',
    quality = 100,
    lazy = false,
    optimize = true,
}) => {
    const onError = (event) => {
        event.target.classList.add('has-error');
    };

    return (
        <>
            <Image
                src={generateThumborUrl(src, width, height)}
                width={width}
                height={height}
                alt={alt}
                loading={lazy ? 'lazy' : 'eager'}
                unoptimized={!optimize}
                onError={onError}
                quality={quality}
                className={`img-bg-load ${className}`}
            />
            <style jsx global>
                {`
                    img.has-error {
                        // fallback to placeholder image on error
                        content: url(/assets/img/placeholder.png);
                    }
                    .img-bg-load {
                        background: #f8f8f8;
                    }
                `}
            </style>
        </>
    );
};

export default CustomImage;
