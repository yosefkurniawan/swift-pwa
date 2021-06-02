/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

const ProductVideo = (props) => {
    const { width, height, desktop } = props;
    return (
        <div className="product-video">
            {
                desktop
                    ? (
                        <iframe
                            width={width}
                            height={height}
                            src="https://www.youtube.com/embed/FgClVb6CzZ4"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                    )
                    : (
                        <video width={width} height={height} controls loop>
                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                        </video>
                    )
            }
        </div>
    );
};

export default ProductVideo;
