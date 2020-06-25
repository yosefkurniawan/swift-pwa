import React from 'react';
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import ImageSlider from './ImageSlider';
import './style.css';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // dummy slides data
            // slides: ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5'],
            // virtual data
        };
    }

    componentDidMount() {
        // eslint-disable-next-line no-unused-vars
        const swiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: true,

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },
            autoplay: {
                delay: 3000,
            },
        });
    }

    render() {
        const { data, height, width } = this.props;
        return (
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {data.map((item, key) => (
                        <div className="swiper-slide" key={key}>
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
            </div>
        );
    }
}
