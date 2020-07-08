import React from 'react';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import ImageSlider from './ImageSlider';

const BannerSlider = (props) => {
    const {
        data, height, width, autoPlay = true,
    } = props;
    React.useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const swiper = new Swiper('.swipper-banner', {
            direction: 'horizontal',
            loop: true,

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: !autoPlay,
            },
            autoplay: autoPlay ? {
                delay: 3000,
            } : false,
        });
    }, []);
    return (
        <div className="swiper-container swipper-banner swipper-container-custom">
            <div className="swiper-wrapper">
                {data.map((item, key) => (
                    <div className="swiper-slide swiper-slide-custom" key={key}>
                        <ImageSlider
                            height={height}
                            width={width}
                            key={key}
                            {...item}
                        />
                    </div>
                ))}
            </div>
            <div className="swiper-pagination" />
            <style jsx>
                {`
                    .swiper-container {
                        width: 100%;
                        height: 100%;
                        position: relative;
                    }

                    .swiper-slide-custom {
                        width: 100%;
                        height: 100% !important;
                    }

                `}
            </style>
        </div>
    );
};

export default BannerSlider;
