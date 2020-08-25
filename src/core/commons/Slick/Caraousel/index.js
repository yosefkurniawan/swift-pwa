import React from 'react';
import Slider from 'react-slick';
import ProductItem from '@core/catalog/plugin/ProductItem';
import useStyles from './style';

const Caraousel = (props) => {
    const styles = useStyles();
    const { data = [] } = props;
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: data.length > 4 ? data.length / 2 : 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: true,
                    className: 'slider variable-width',
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    className: 'slider variable-width',
                },
            },
        ],
    };

    return (
        <div className={styles.caraousel}>
            <Slider {...settings}>
                {
                    data && data.length > 0 && data.map((item, key) => (
                        <ProductItem key={key} {...item} />
                    ))
                }
            </Slider>
        </div>
    );
};

export default Caraousel;
