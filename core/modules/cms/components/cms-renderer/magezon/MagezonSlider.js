/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-return-assign */

import React, { useRef } from 'react';
import Slider from 'react-slick';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { generateThumborUrl } from '@helpers/image';
import { features } from '@config';
import { getStoreHost } from '@helpers/config';
import MagezonHeading from '@core_modules/cms/components/cms-renderer/magezon/MagezonHeading';

const MagezonSliderContent = (props) => {
    const {
        heading, heading_animation, heading_animation_delay, heading_bg_color,
        heading_color, heading_font_size, heading_line_height,
        heading_padding, heading_font_weight, heading_type,
        caption1, caption1_animation, caption1_animation_delay, caption1_bg_color,
        caption1_color, caption1_font_size, caption1_font_weight,
        caption1_line_height, caption1_padding, caption1_type,
        caption2, caption2_animation, caption2_animation_delay, caption2_bg_color,
        caption2_color, caption2_font_size, caption2_font_weight,
        caption2_line_height, caption2_padding, caption2_type,
        content_align, content_padding, content_position,
        content_width, content_wrapper_width,
        youtube_id,
        image, background_type, slider_height,
    } = props;
    const animationStyles = 'animate__animated animate__';
    const mediaUrl = `${getStoreHost()}media`;
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const slideHeight = features.imageSize.magezonSlider[isDesktop ? 'desktop' : 'mobile'].height;
    const slideWidth = features.imageSize.magezonSlider[isDesktop ? 'desktop' : 'mobile'].width;

    const getBackgroundImageUrl = (backgroundType, img) => {
        if (backgroundType === 'image') {
            const thumborUrl = generateThumborUrl(`${mediaUrl}/${img}`, slideWidth, slideHeight);
            return `url("${thumborUrl}")`;
        }
        return 'url()';
    };

    return (
        <>
            {background_type === 'youtube' ? (
                <div style={{ height: `${slider_height}px` }}>
                    <iframe
                        style={{ width: '100%', height: '100%' }}
                        src={`https://www.youtube.com/embed/${youtube_id}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded Video"
                    />
                </div>
            ) : (
                <div
                    className="magezon-slide"
                    style={{ backgroundImage: getBackgroundImageUrl(background_type, image) }}
                >
                    <div className={`magezon-slide-captions ${content_position}`}>
                        <div>
                            {heading && (
                                <div className={`magezon-slide-heading ${heading_animation && `${animationStyles}${heading_animation}`}`}>
                                    <MagezonHeading
                                        text={heading}
                                        heading_type={heading_type}
                                        font_size={heading_font_size}
                                        color={heading_color}
                                        font_weight={heading_font_weight}
                                    />
                                </div>
                            )}
                            {caption1 && (
                                <div className={`magezon-slide-caption1 ${caption1_animation && `${animationStyles}${caption1_animation}`}`}>
                                    <MagezonHeading
                                        text={caption1}
                                        heading_type={caption1_type}
                                        font_size={caption1_font_size}
                                        color={caption1_color}
                                        font_weight={caption1_font_weight}
                                    />
                                </div>
                            )}
                            {caption2 && (
                                <div className={`magezon-slide-caption2 ${caption2_animation && `${animationStyles}${caption2_animation}`}`}>
                                    <MagezonHeading
                                        text={caption2}
                                        heading_type={caption2_type}
                                        font_size={caption2_font_size}
                                        color={caption2_color}
                                        font_weight={caption2_font_weight}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <style jsx>
                {`
                    .magezon-slide-content-wrapper {
                        display: flex;
                        justify-content: flex-start;
                    }
                    .magezon-slide-captions {
                        max-width: ${content_wrapper_width}px;
                        display: flex;
                        position: absolute;
                        height: 100%;
                        width: 100%;
                        margin: 0 auto;
                        top: 0;
                        left: 0;
                        right: 0;
                    }
                    .magezon-slide-captions > div {
                        max-width: ${content_width}px;
                        text-align: ${content_align};
                        padding: ${content_padding}px;
                    }
                    .magezon-slide-heading {
                        background-color: ${heading_bg_color};
                    }
                    .magezon-slide-caption1 {
                        background-color: ${caption1_bg_color};
                    }
                    .magezon-slide-caption2 {
                        background-color: ${caption2_bg_color};
                    }
                    .magezon-slide-heading, .magezon-slide-caption1, .magezon-slide-caption2 {
                        margin-bottom: 5px;
                    }
                    .magezon-slide-heading :global(.magezone-heading :is(h1, h2, h3, h4, h5, h6)) {
                        line-height: ${heading_line_height}px;
                        padding: ${heading_padding}px;
                        margin: 0;
                    }
                    .magezon-slide-caption1 :global(.magezone-heading :is(h1, h2, h3, h4, h5, h6)) {
                        line-height: ${caption1_line_height}px;
                        padding: ${caption1_padding}px;
                        margin: 0;
                    }
                    .magezon-slide-caption2 :global(.magezone-heading :is(h1, h2, h3, h4, h5, h6)) {
                        line-height: ${caption2_line_height}px;
                        padding: ${caption2_padding}px;
                        margin: 0;
                    }
                    .magezon-slide-captions :global(.magezone-heading) {
                        justify-content: center;
                    }
                    .middle-center {
                        align-items: center;
                        justify-content: center;
                    }
                    .middle-left {
                        align-items: center;
                        justify-content: flex-start;
                    }
                    .middle-right {
                        align-items: center;
                        justify-content: flex-end;
                    }
                    .top-left {
                        align-items: flex-start;
                        justify-content: flex-start;
                    }
                    .top-center {
                        align-items: flex-start;
                        justify-content: center;
                    }
                    .top-right {
                        align-items: flex-start;
                        justify-content: flex-end;
                    }
                    .bottom-left {
                        align-items: flex-end;
                        justify-content: flex-start;
                    }
                    .bottom-center {
                        align-items: flex-end;
                        justify-content: center;
                    }
                    .bottom-right {
                        align-items: flex-end;
                        justify-content: flex-end;
                    }
                `}
            </style>
        </>
    );
};

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
        slider_height,
    } = props;
    const { unhoverStyle, hoverStyle } = useHoverStyle(image_hover_effect);
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const slideHeight = features.imageSize.magezonSlider[isDesktop ? 'desktop' : 'mobile'].height;
    const slideWidth = features.imageSize.magezonSlider[isDesktop ? 'desktop' : 'mobile'].width;
    let sliderRef = useRef();

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
        // beforeChange: (oldIdx, newIdx) => {
        //     console.log(sliderRef.innerSlider.list.querySelector('.magezon-slide-heading').classList.contains('magezon-slide-heading'));
        // },
    };

    return (
        <>
            <div className="magezon-slider">
                <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                    {items.map((item, i) => (
                        <MagezonSliderContent key={i} slider_height={slider_height} {...item} />
                    ))}
                </Slider>
            </div>
            <style jsx>
                {`
                    .magezon-slider {
                        padding-bottom: 30px;
                        height: ${slider_height}px;
                    }
                    .magezon-slider :global(.slick-slide) {
                        height: auto;
                    }
                    .magezon-slider :global(.slick-track) {
                        height: ${slider_height}px;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        align-items: center;
                        justify-content: center;
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
                    .magezon-slider :global(.magezon-slide) {
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
                    .magezon-slider :global(.magezon-slide:hover) {
                        ${hoverStyle}
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
