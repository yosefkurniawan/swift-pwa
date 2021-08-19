/* eslint-disable object-curly-newline */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-globals */

import { generateThumborUrl } from '@root/core/helpers/image';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Slider from 'react-slick';

const ImageElement = dynamic(import('@core_modules/cms/components/cms-renderer/magezon/MagezonImageGallery/ImageElement'), { ssr: false });

const MagezonImageGallery = (props) => {
    // prettier-ignore
    const {
        autoplay,
        items, loop,
        maxwidth, minwidth, minheight, nav, navposition, rtl,
        startindex, stopautoplayontouch, swipe, thumbheight,
        thumbmargin, thumbwidth, width, keyboard,
        shuffle, transition,
        storeConfig, arrows,
        // shadows, click, trackpad, margin,
        // , captions, allowfullscreen, gallery_type,
        fit,
    } = props;
    const { secure_base_media_url } = storeConfig;
    const [slideIndex, setIndex] = useState(startindex || 0);
    const [itemsArr, setItemsArr] = useState(items);
    const [hasSetPosition, setHasSetPosition] = useState(false);
    const maxHeight = 750;
    let focusSlider;
    let sliderRef = useRef();
    const navRef = useRef();

    const calculateHeight = () => {
        let newHeight = maxHeight;
        let newWidth = width;

        if (width || minwidth || maxwidth) {
            if (Number(width.split('%')[0]) > Number(maxwidth.split('%')[0])) {
                newWidth = maxwidth;
            }

            if (Number(minwidth.split('%')[0]) > Number(width.split('%')[0]) || Number(minwidth.split('%')[0]) > Number(maxwidth.split('%')[0])) {
                newWidth = minwidth;
            }

            if (width.includes('%')) {
                newHeight = (newWidth.split('%')[0] / 100) * maxHeight;
            }
        }

        if (minheight) {
            newHeight *= minheight.split('%')[0] / 100;
        }

        return newHeight;
    };

    const setAutoplay = () => {
        let autoPlayValue = false;
        let autoPlaySpeed = 3000;

        if (autoplay) {
            if (autoplay === 'true' || autoplay === 'false') {
                if (autoplay === 'true') autoPlayValue = true;
                if (autoplay === 'false') autoPlayValue = false;
            }

            if (!isNaN(Number(autoplay))) {
                if (Number(autoplay) > 0) {
                    autoPlayValue = true;
                    autoPlaySpeed = Number(autoplay);
                }
            }
        }

        return {
            autoplay: autoPlayValue,
            autoplaySpeed: autoPlaySpeed,
        };
    };

    const pauseSlick = () => {
        if (stopautoplayontouch) {
            sliderRef.slickPause();
        }
    };

    const shuffleSlick = () => items
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    const adjustItems = () => {
        let adjustedItems = items;

        if (rtl) {
            adjustedItems = items.reverse();
        }

        if (shuffle) {
            adjustedItems = shuffleSlick();
        }

        return adjustedItems;
    };

    const settings = {
        arrows,
        fade: transition !== 'slide',
        infinite: loop,
        initialSlide: startindex || 0,
        autoplay: setAutoplay().autoplay,
        autoplaySpeed: setAutoplay().autoplaySpeed,
        slidesToShow: 1,
        slidesToScroll: 1,
        width: 600,
        swipe,
        beforeChange: (old, next) => setIndex(next),
        pauseOnHover: false,
    };

    const updatedItems = useMemo(() => adjustItems(), [items]);
    useEffect(() => {
        if (keyboard) {
            const track = sliderRef.innerSlider.list.querySelector('.slick-track');
            focusSlider = setTimeout(() => {
                const slide = track.querySelector('.slick-slide');
                slide.focus();
            }, 0);
        }

        setItemsArr(updatedItems);

        return () => clearTimeout(focusSlider);
    }, []);

    useEffect(() => {
        if (sliderRef && !hasSetPosition) {
            sliderRef.slickGoTo(startindex || 0);
            setHasSetPosition(true);
        }
    }, [hasSetPosition]);

    return (
        <>
            <div className="mgz-img-gallery">
                <div className="mgz-img-gallery-container">
                    <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                        {itemsArr.map((item, index) => (
                            <ImageElement
                                key={index}
                                {...item}
                                baseUrl={secure_base_media_url}
                                pauseSlick={pauseSlick}
                                height={calculateHeight()}
                                fit={fit}
                            />
                        ))}
                    </Slider>
                </div>
                {nav === 'thumbs' && (
                    <div className="mgz-img-gallery-nav">
                        {itemsArr.map((item, index) => {
                            const { type, image, link } = item;
                            const imgUrl = type === 'link' ? link : `${secure_base_media_url}${image}`;

                            return (
                                <div
                                    key={index}
                                    ref={navRef}
                                    tabIndex={index}
                                    className={slideIndex === index && 'mgz-active'}
                                    onClick={() => {
                                        sliderRef.slickGoTo(index);
                                    }}
                                    onKeyDown={({ key }) => {
                                        if (key === 'ArrowLeft') {
                                            sliderRef.slickPrev();
                                        }
                                        if (key === 'ArrowRight') {
                                            sliderRef.slickNext();
                                        }
                                    }}
                                >
                                    <img
                                        data-pagespeed-no-defer
                                        src={generateThumborUrl(imgUrl, 0, 0)}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/assets/img/placeholder.png';
                                        }}
                                        style={{ width: '100%', height: '100%' }}
                                        alt={`nav-${nav}-item`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <style jsx>
                {`
                    .mgz-img-gallery {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: ${navposition === 'bottom' ? 'column' : 'column-reverse'};
                    }
                    .mgz-img-gallery-container {
                        width: ${width};
                        min-width: ${minwidth};
                        max-width: ${maxwidth};
                        width: 100%;
                        max-height: ${calculateHeight()}px;
                        overflow: hidden;
                    }
                    .mgz-img-gallery-nav > div:focus {
                        outline: none;
                    }
                    .mgz-active {
                        border: 2px solid #00afea;
                        outline: none;
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .mgz-img-gallery-container .slick-slide {
                        height: 100%;
                    }
                    .mgz-img-gallery-container .slick-track {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        height: ${calculateHeight()}px;
                        align-items: center;
                        justify-content: center;
                    }
                    .mgz-img-gallery-container .slick-prev {
                        left: 0;
                    }
                    .mgz-img-gallery-container .slick-next {
                        right: 0;
                    }
                    .mgz-img-gallery-container .slick-arrow {
                        z-index: 100;
                        background-color: #c5c5c5;
                    }
                    .slick-slide > div {
                        height: 100%;
                        width: 100%;
                        display: flex;
                        position: relative;
                    }
                    .mgz-img-gallery-nav {
                        display: flex;
                    }
                    .mgz-img-gallery-nav div {
                        margin: ${thumbmargin ? `${thumbmargin}px` : '2px'};
                        width: ${thumbwidth ? `${thumbwidth}px` : '2px'};
                        height: ${thumbheight ? `${thumbheight}px` : '2px'};
                        overflow: hidden;
                    }
                    .mgz-img-gallery-nav div:hover {
                        cursor: pointer;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonImageGallery;
