/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Slider from 'react-slick';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { generateThumborUrl } from '@helpers/image';
import { features } from '@config';
import { getStoreHost } from '@helpers/config';

const MagezonSlider = (props) => {
    const { items } = props;
    const mediaUrl = `${getStoreHost()}media`;
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const slideHeight = features.imageSize.magezonSlider[isDesktop ? 'desktop' : 'mobile'].height;
    const slideWidth = features.imageSize.magezonSlider[isDesktop ? 'desktop' : 'mobile'].width;

    // REMOVE THIS LINE!
    console.log(props, mediaUrl, slideHeight, slideWidth);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };

    const getBackgroundImageUrl = (background_type, image) => {
        if (background_type === 'image') {
            const thumborUrl = generateThumborUrl(`${mediaUrl}/${image}`, slideWidth, slideHeight);
            return `url("${thumborUrl}")`;
        }
        return 'url()';
    };

    return (
        <>
            <div className="magezon-slider">
                <Slider {...settings}>
                    {items.map((item, i) => {
                        const {
                            caption1, caption2, image, background_type,
                        } = item;
                        return (
                            <div key={i}>
                                <div
                                    className="magezon-slide"
                                    style={{ backgroundImage: getBackgroundImageUrl(background_type, image) }}
                                >
                                    <div className="magezon-slide-captions">
                                        {caption1 && <h3>{caption1}</h3>}
                                        {caption2 && <h3>{caption2}</h3>}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
            <style jsx>
                {`
                    .magezon-slider {
                        padding-bottom: 30px;
                    }
                    .magezon-slider :global(.slick-arrow.slick-prev) {
                        left: 12px;
                        z-index: 99;
                    }
                    .magezon-slider :global(.slick-arrow.slick-next) {
                        right: 12px;
                        z-index: 99;
                    }
                    .magezon-slider .magezon-slide {
                        text-align: center;
                        position: relative;
                        padding-bottom: ${100 * (slideHeight / slideWidth)}%;
                        background-color: #ddd;
                        background-position: center;
                        background-size: cover;
                        background-repeat: no-repeat;
                        margin: 0 1px;
                    }
                    .magezon-slide-captions {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                `}
            </style>
        </>
    );
};

export default MagezonSlider;
