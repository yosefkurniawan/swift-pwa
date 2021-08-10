/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Slider from 'react-slick';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { generateThumborUrl } from '@helpers/image';
import { features } from '@config';
import { getStoreHost } from '@helpers/config';
import MagezonHeading from '@core_modules/cms/components/cms-renderer/magezon/MagezonHeading';

const useHoverStyle = (hoverEffect) => {
    let unhoverStyle = '';
    let hoverStyle = '';
    if (hoverEffect === 'zoomin' || hoverEffect === 'zoomout') {
        unhoverStyle = 'transition: transform 1s, filter 2s ease-in-out; transform-origin: center; transform: scale(1);';
        hoverStyle = 'transition: transform 1s, filter 2s ease-in-out; transform-origin: center;';
    }
    if (hoverEffect === 'zoomin') hoverStyle += 'transform: scale(1.02);';
    if (hoverEffect === 'zoomout') hoverStyle += 'transform: scale(0.98);';

    return { unhoverStyle, hoverStyle };
};

const MagezonSlider = (props) => {
    const {
        items, image_hover_effect,
        owl_nav, owl_dots, owl_lazyLoad, owl_loop, owl_autoplay, owl_autoplay_timeout, owl_rtl,
    } = props;
    const { unhoverStyle, hoverStyle } = useHoverStyle(image_hover_effect);
    const mediaUrl = `${getStoreHost()}media`;
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const slideHeight = features.imageSize.magezonSlider[isDesktop ? 'desktop' : 'mobile'].height;
    const slideWidth = features.imageSize.magezonSlider[isDesktop ? 'desktop' : 'mobile'].width;

    const settings = {
        dots: owl_dots,
        infinite: owl_loop,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: owl_autoplay,
        autoplaySpeed: owl_autoplay_timeout || 2000,
        pauseOnHover: true,
        lazyLoad: owl_lazyLoad,
        rtl: owl_rtl,
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
                            heading, heading_type, heading_color, heading_font_weight,
                            caption1, caption1_type, caption1_color, caption1_font_weight,
                            caption2, caption2_type, caption2_color, caption2_font_weight,
                            image, background_type,
                        } = item;
                        return (
                            <div key={i}>
                                <div
                                    className="magezon-slide"
                                    style={{ backgroundImage: getBackgroundImageUrl(background_type, image) }}
                                >
                                    <div className="magezon-slide-captions">
                                        {heading && (
                                            <MagezonHeading
                                                text={heading}
                                                heading_type={heading_type}
                                                font_size={isDesktop ? 27 : 16}
                                                color={heading_color}
                                                font_weight={heading_font_weight}
                                            />
                                        )}
                                        {caption1 && (
                                            <MagezonHeading
                                                text={caption1}
                                                heading_type={caption1_type}
                                                font_size={isDesktop ? 16 : 10}
                                                color={caption1_color}
                                                font_weight={caption1_font_weight}
                                            />
                                        )}
                                        {caption2 && (
                                            <MagezonHeading
                                                text={caption2}
                                                heading_type={caption2_type}
                                                font_size={isDesktop ? 12 : 8}
                                                color={caption2_color}
                                                font_weight={caption2_font_weight}
                                            />
                                        )}
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
                    .magezon-slider :global(.slick-arrow:before) {
                        font-size: 20px;
                    }
                    .magezon-slider :global(.slick-arrow) {
                        z-index: 99;
                        ${owl_nav ? '' : 'display: none !important;'}
                    }
                    .magezon-slider :global(.slick-arrow.slick-prev) {
                        left: 12px;
                    }
                    .magezon-slider :global(.slick-arrow.slick-next) {
                        right: 12px;
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
                        ${unhoverStyle}
                    }
                    .magezon-slider .magezon-slide:hover{
                        ${hoverStyle}
                    }
                    .magezon-slide-captions {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    .magezon-slide-captions :global(.magezone-heading) {
                        justify-content: center;
                    }
                    @media screen and (min-width: 768px) {
                        .magezon-slider :global(.slick-arrow:before) {
                            font-size: 24px;
                        }
                        .magezon-slider :global(.slick-arrow.slick-prev) {
                            left: 16px;
                        }
                        .magezon-slider :global(.slick-arrow.slick-next) {
                            right: 16px;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default MagezonSlider;
