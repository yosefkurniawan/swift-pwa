/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import 'swiper/css/swiper.min.css';
import Swiper from 'swiper';
import Item from './Item';

const Caraousel = ({
    data = [], title = '', className = '', storeConfig, customItem, customSlideClass,
}) => {
    React.useEffect(() => {
        const swiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true,
            breakpoints: {
                0: {
                    slidesPerView: 1.3,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 1.3,
                    spaceBetween: 30,
                },
                768: {
                    slidesPerView: 3.3,
                    spaceBetween: 30,
                },
            },
        });
    });
    return (
        <div className="swiper-container swiper-image">
            <div className="swiper-wrapper">
                {data.length > 0 && data.map((item, y) => (customItem ? (
                    <div className="swiper-slide" key={y}>
                        {customItem({
                            ...item,
                            storeConfig,
                            key: y,
                        })}
                    </div>
                ) : (
                    <div className="swiper-slide" key={y}>
                        <Item {...item} key={y} storeConfig={storeConfig} />
                    </div>
                )))}
            </div>

            <style jsx>
                {`
                    .swiper-image {
                        background: #f8f8f8;
                    }
                    .swiper-slide {
                        text-align: center;
                        font-size: 18px;
                        background: #fff;
                        width: 100%;
                        /* Center slide text vertically */
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-pack: center;
                        -ms-flex-pack: center;
                        -webkit-justify-content: center;
                        justify-content: center;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        -webkit-align-items: center;
                        align-items: center;
                    }
                `}
            </style>
        </div>
    );
};

export default Caraousel;
