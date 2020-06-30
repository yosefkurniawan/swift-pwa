/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import 'swiper/css/swiper.min.css';
import Swiper from 'swiper';
import Item from '../../Slider/Carousel/Item';

const Caraousel = ({
    data = [1, 2, 3], title = '', className = '', storeConfig, customItem, customSlideClass,
}) => {
    React.useEffect(() => {
        const swiper = new Swiper('.swipper-image', {
            direction: 'horizontal',
            loop: true,
            slidesPerView: 3,
            spaceBetween: 30,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
    });
    return (
        <div className="swiper-container swipper-image">
            <div className="swiper-wrapper">
                {data.map((item, y) => (customItem ? (
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
                <style jsx>
                    {`
                    
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
        </div>
    );
};

export default Caraousel;
