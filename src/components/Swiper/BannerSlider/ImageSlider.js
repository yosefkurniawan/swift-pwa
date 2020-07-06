import React from 'react';
import Link from 'next/link';
import { imageSize } from '@config';
import setDefaultWhenEmpty from '@helpers/checkImageSrc';
import Thumbor from '@components/Image';

/**
 slug page need props 'href' & 'as' to prevent browser reloading
 *isSlug == true => <link href="/[...slug]" as={link} />
 *isSlug == false => <link href={link} />
*/

const ImageSlide = ({
    imageUrl = '', link = '#', isSlug = true, width, height,
}) => {
    const href = link && link[0] === '/' ? link : `/${link}`;
    return (
        <Link
            href={isSlug ? '/[...slug]' : href}
            {...(isSlug && { as: href })}
        >
            <a>
                <Thumbor
                    src={setDefaultWhenEmpty(imageUrl)}
                    alt={href}
                    width={width || imageSize.homeSlider.width}
                    height={height || imageSize.homeSlider.height}
                    quality={100}
                    className="img-slider"
                />

                <style jsx>
                    {`
                        .img-slider {
                            display: flex;
                            width: 100%;
                        }

                    `}
                </style>
            </a>
        </Link>
    );
};

export default ImageSlide;
