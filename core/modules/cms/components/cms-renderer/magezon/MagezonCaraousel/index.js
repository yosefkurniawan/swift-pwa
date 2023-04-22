import React from 'react';
import dynamic from 'next/dynamic';

import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@helpers/env';
import { basePath } from '@config';
import MagezonLink from '@core_modules/cms/components/cms-renderer/magezon/MagezonLink';
import Typography from '@common_typography';

import { mapList, validatePx } from './helpers/index';
import ImageWithLightbox from './components/ImageWithLightbox';
import ImageWrapper from './components/ImageWrapper';

const CaraouselComponent = dynamic(import('@core_modules/cms/components/cms-renderer/magezon/MagezonCaraousel/components'));
const ImageWithAction = dynamic(import('@core_modules/cms/components/cms-renderer/magezon/MagezonCaraousel/components/ImageWithAction'));

const MagezonCaraouel = (props) => {
    const {
        content_background,
        content_color,
        content_fullwidth,
        content_padding,
        content_position,
        display_on_hover,
        hover_effect,
        overlay_color,
        onclick,
        show_line,
        items,
        description,
        description_font_size,
        description_font_weight,
        title,
        title_tag,
        title_color,
        title_align,
        title_font_size,
        title_font_weight,
        image_border_color,
        image_border_radius,
        image_border_style,
        image_border_width,
        image_size,
        line_color,
        line_position,
        line_width,
        owl_color,
        owl_hover_color,
        owl_active_color,
        owl_background_color,
        owl_hover_background_color,
        owl_active_background_color,
        owl_item_xs,
        owl_item_sm,
        owl_item_md,
        owl_item_lg,
        owl_item_xl,
        owl_margin,
        owl_nav,
        owl_nav_size,
        owl_nav_position,
        owl_rtl,
        owl_autoplay,
        owl_autoplay_speed,
        owl_autoplay_timeout,
        owl_autoplay_hover_pause,
        owl_auto_height,
        owl_center,
        owl_dots,
        owl_loop,
        owl_slide_by,
        owl_lazyload,
        owl_stage_padding,
        storeConfig,
    } = props;

    let navSize = 0;
    if (owl_nav) {
        switch (owl_nav_size) {
        case ('mini'):
            navSize = 20;
            break;
        case ('small'):
            navSize = 30;
            break;
        case ('normal'):
            navSize = 40;
            break;
        case ('large'):
            navSize = 50;
            break;
        default:
            break;
        }
    }

    // eslint-disable-next-line consistent-return
    const positionSwitch = (s) => {
        switch (s) {
        case ('top'):
            return 'top:0; ';
        case ('bottom'):
            return 'bottom:0; ';
        case ('left'):
            return `right:${validatePx(owl_margin / 2)}; `;
        case ('right'):
            return `left:${validatePx(owl_margin / 2)}; `;
        case ('middle'):
            return 'top:0; bottom:0; height:50%; min-height:70px; ';
        case ('center'):
            return `left:${validatePx(owl_margin / 2)}; right:${validatePx(owl_margin / 2)}; `;
        default:
        }
    };

    let contentPositionClass = '';
    if (content_position !== 'none') {
        if (content_position !== 'below') {
            contentPositionClass += 'position: absolute; ';
            const listStyle = content_position.split('-');
            contentPositionClass += positionSwitch(listStyle[0]);
            contentPositionClass += positionSwitch(listStyle[1]);
        } else {
            contentPositionClass += `width: calc(100% - ${validatePx(owl_margin)}); `;
        }
    } else {
        contentPositionClass += 'display: none; ';
    }

    let arrowNav = '';
    let arrowNavMobile = '';
    let rightNav = '';
    let leftNav = '';
    const navList = owl_nav_position.split('_');
    if (owl_nav) {
        switch (navList[0]) {
        case ('top'):
            arrowNav = 'top: -80px; ';
            break;
        case ('bottom'):
            // arrowNav = 'bottom: -30%; ';
            arrowNav = `bottom: ${navList[1] === 'center' ? '-60px' : '-100px'}`;
            arrowNavMobile = `bottom: ${navList[1] === 'center' ? '30px' : '-30px'} !important`;
            break;
        case ('center'):
            arrowNav = 'top: calc(60% - 1rem); ';
            break;
        default:
        }
    }
    if (owl_nav) {
        switch (navList[1]) {
        case ('left'):
            rightNav = `left: calc(${validatePx(navSize)} + 10px) `;
            leftNav = 'left: 0; ';
            break;
        case ('right'):
            leftNav = `right: calc(${validatePx(navSize)} + 10px) `;
            rightNav = 'right: 0; ';
            break;
        case ('center'):
            leftNav = `left: calc(50% - ${validatePx(navSize)} - 5px) `;
            rightNav = `right: calc(50% - ${validatePx(navSize)} - 5px); `;
            break;
        case ('split'):
            leftNav = 'left: 0; ';
            rightNav = 'right: 0; ';
            break;
        default:
        }
    }

    const imageUrl = (item) => `${getStoreHost(getAppEnv())}media/${item.image}` || `${basePath}/assets/img/placeholder.png`;

    return (
        <div className="mgz-CCaraouselComponent">
            {title && (
                <div className="mgz-carousel-heading">
                    <Typography className="mgz-carousel-heading-title" variant={title_tag} align={title_align} letter="uppercase">
                        {title}
                    </Typography>
                    {description && (
                        <Typography className="mgz-carousel-heading-desc" align={title_align} variant="h6">
                            {description}
                        </Typography>
                    )}
                </div>
            )}
            {onclick === 'magnific' ? (
                <ImageWithLightbox
                    hover_effect={hover_effect}
                    items={items}
                    overlay_color={overlay_color}
                    owl_autoplay={owl_autoplay}
                    owl_autoplay_speed={owl_autoplay_speed}
                    owl_autoplay_timeout={owl_autoplay_timeout}
                    owl_autoplay_hover_pause={owl_autoplay_hover_pause}
                    owl_auto_height={owl_auto_height}
                    owl_center={owl_center}
                    owl_dots={owl_dots}
                    owl_item_xs={owl_item_xs}
                    owl_item_sm={owl_item_sm}
                    owl_item_md={owl_item_md}
                    owl_item_lg={owl_item_lg}
                    owl_item_xl={owl_item_xl}
                    owl_loop={owl_loop}
                    owl_lazyload={owl_lazyload}
                    owl_nav={owl_nav}
                    owl_rtl={owl_rtl}
                    owl_slide_by={owl_slide_by}
                    owl_stage_padding={owl_stage_padding}
                    storeConfig={storeConfig}
                    title={title}
                />
            ) : (
                <CaraouselComponent
                    data={mapList(items, owl_loop)}
                    slideXs={owl_item_xs}
                    slideSm={owl_item_sm}
                    slideMd={owl_item_md}
                    slideLg={owl_item_lg}
                    slideXl={owl_item_xl}
                    infinite={owl_loop}
                    rtl={owl_rtl}
                    centerMode={owl_center}
                    pauseOnHover={owl_autoplay_hover_pause}
                    autoplay={owl_autoplay}
                    autoplaySpeed={owl_autoplay_speed}
                    dots={owl_dots}
                    slidesToScroll={owl_slide_by}
                    speed={owl_autoplay_timeout}
                    adaptiveHeight={owl_auto_height}
                    arrows={owl_nav}
                    lazyLoad={owl_lazyload}
                    Item={({ item }) => (
                        <MagezonLink link={item.custom_link}>
                            <ImageWrapper hover_effect={hover_effect} item={item} overlay_color={overlay_color}>
                                <ImageWithAction url={imageUrl(item)} alt_tag={item.title || '' || 'magezon image'} storeConfig={storeConfig} />
                            </ImageWrapper>
                        </MagezonLink>
                    )}
                    centerPadding={validatePx(owl_stage_padding)}
                />
            )}
            <style jsx>
                {`
                    .mgz-carousel {
                        width: 100%;
                        height: 100%;
                        position: relative;
                    }
                    .mgz-carousel :global(a) {
                        color: transparent !important;
                    }
                    .mgz-carousel :global(.slick-track) {
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .mgz-carousel :global(.slick-list) {
                        padding: 0 ${validatePx(owl_stage_padding)};
                    }
                    .mgz-carousel :global(.slick-dots) {
                        bottom: ${navList === 'bottom_center' ? '-85px' : '-45px'};
                    }
                    .mgz-carousel :global(.slick-dots li button:before) {
                        opacity: 1;
                        color: ${owl_background_color};
                        font-size: 10px;
                        transition: 0.3s;
                    }
                    .mgz-carousel :global(.slick-dots li:hover button:before) {
                        color: ${owl_hover_background_color};
                    }
                    .mgz-carousel :global(.slick-dots li.slick-active button:before) {
                        color: ${owl_active_background_color};
                    }
                    @media (min-width: 768px) {
                        .mgz-carousel {
                            height: auto;
                        }
                    }
                    @media (max-width: 767px) {
                        .mgz-carousel {
                            max-width: 100vw;
                        }
                    }
                    .mgz-carousel :global(.mgz-carousel-heading) {
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                        position: relative;
                        text-align: ${title_align};
                        ${title_color ? `color: ${title_color}` : ''}
                    }
                    .mgz-carousel :global(.mgz-carousel-heading:before) {
                        content: '';
                        display: block;
                        height: ${show_line ? validatePx(line_width) : 0};
                        width: 100%;
                        background: ${line_color};
                        position: absolute;
                        top: ${line_position ? '40%' : '90%'};
                        bottom: 0;
                        z-index: 0;
                    }
                    .mgz-carousel :global(.mgz-carousel-heading-title) {
                        display: inline-block;
                        background: #fff;
                        padding: 0 10px;
                        position: relative;
                        font-size: 1.5rem;
                        line-height: 1.2;
                    }
                    .mgz-carousel-heading-desc {
                        font-size: 0.75rem;
                    }
                    .mgz-carousel :global(.mgz-carousel-item-container) {
                        overflow: hidden;
                        position: relative;
                        margin: 0 ${validatePx(owl_margin / 2)};
                        cursor: pointer;
                    }
                    .mgz-carousel-item-container:hover .mgz-carousel-content-wrapper {
                        display: grid;
                    }
                    .mgz-carousel :global(.mgz-carousel-content-wrapper) {
                        background-color: ${content_background || 'transparent'};
                        color: ${content_color};
                        width: ${content_fullwidth ? '100%' : 'fit-content'};
                        padding: ${content_padding};
                        text-align: center;
                        margin: auto;
                        display: ${display_on_hover ? 'none' : 'grid'};
                        align-content: center;
                        ${contentPositionClass}
                        pointer-events: none;
                        left: 0;
                        right: 0;
                        z-index: 2;
                    }
                    .mgz-carousel :global(.mgz-carousel-content-title) {
                        font-size: ${validatePx(title_font_size)};
                        font-weight: ${title_font_weight};
                    }
                    .mgz-carousel :global(.mgz-carousel-content-desc) {
                        font-size: ${validatePx(description_font_size)};
                        font-weight: ${description_font_weight};
                    }
                    .mgz-carousel :global(.mgz-carousel-content-image) {
                        width: 100%;
                        width: ${image_size ? validatePx(image_size.split(' ')[0]) : ''};
                        height: ${image_size ? validatePx(image_size.split(' ')[1]) : ''};
                        border-width: ${validatePx(image_border_width)};
                        border-style: ${image_border_width ? image_border_style : null};
                        border-radius: ${validatePx(image_border_radius)};
                        border-color: ${image_border_color};
                    }
                    .mgz-carousel :global(.mgz-carousel-overlay) {
                        background-color: ${overlay_color || 'transparent'};
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        top: 0;
                        pointer-events: none;
                    }
                    .mgz-carousel-zoomout {
                        transition: transform 0.5s, filter 1s ease-in-out;
                        transform: scale(1.2);
                    }
                    .mgz-carousel-zoomout:hover {
                        transform: scale(1);
                    }
                    .mgz-carousel-zoomin {
                        transition: transform 0.5s, filter 1s ease-in-out;
                        transform: scale(1);
                    }
                    .mgz-carousel-zoomin:hover {
                        transform: scale(1.2);
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .mgz-carousel-arrow {
                        color: ${owl_color};
                        background-color: ${owl_background_color || 'transparent'};
                        width: ${navSize}px;
                        height: ${navSize}px;
                        font-size: 12px;
                        transition: 0.3s;
                        ${arrowNav}
                    }
                    .mgz-carousel-arrow:hover {
                        color: ${owl_hover_color};
                        background-color: ${owl_hover_background_color || 'transparent'};
                    }
                    .mgz-carousel-arrow:active {
                        color: ${owl_active_color};
                        background-color: ${owl_active_background_color || 'transparent'};
                    }
                    .mgz-carousel-arrow-left {
                        ${leftNav}
                    }
                    .mgz-carousel-arrow-right {
                        ${rightNav}
                    }
                    @media (max-width: 767px) {
                        .mgz-carousel-arrow {
                            ${arrowNavMobile}
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonCaraouel;
