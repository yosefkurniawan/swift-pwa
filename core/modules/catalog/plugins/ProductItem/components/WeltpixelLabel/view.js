import React from 'react';
import classNames from 'classnames';

const WeltpixelLabelView = (props) => {
    const {
        data = [], onDetailProduct, withThumbnailProduct, categoryLabel,
    } = props;
    const styleWithThumbnailProduct = (item) => {
        if (withThumbnailProduct) {
            if (item.position === 1 || item.position === 4 || item.position === 7) {
                return 'with-thumbnail-product';
            }
            if (item.position === 3 || item.position === 6 || item.position === 9) {
                return 'with-thumbnail-product-right';
            }
        } else if (!categoryLabel && (item.position === 3 || item.position === 6 || item.position === 9)) {
            return 'product-right';
        }
        return '';
    };
    const styleTopSmallDevice = (item) => {
        if (item.position === 1 || item.position === 2 || item.position === 3) {
            return 'top-small';
        }
        return '';
    };
    return (
        <>
            {
                data && data.length > 0 && data.map((item, key) => (
                    <div
                        key={key}
                        className={
                            classNames(
                                'text-container',
                                `styles-${item.position}`,
                                styleTopSmallDevice(item),
                                styleWithThumbnailProduct(item),
                                ((item.position === 10 && !onDetailProduct) || item.disabled) ? 'hide' : '',
                            )
                        }
                    >
                        {
                            item.image
                                ? (<img src={item.image} alt={item.text} />)
                                : (<p className="text-label">{item.text}</p>)
                        }
                        <style jsx>
                            {`
                                .text-container {
                                    ${item.css}
                                    background: ${item.image ? 'transparent' : item.text_bg_color};
                                    overflow: auto;
                                    display: table;              
                                    padding: ${item.text_padding};
                                }

                                .text-container img {
                                    max-width: ${categoryLabel ? '3.5em' : '5em'};
                                }

                                @media screen and (min-width: 768px) {
                                    .text-container img {
                                        max-width: ${categoryLabel ? '3.5em' : '8em'};
                                    }
                                  }

                                .text-label {
                                    display: table-row;                      
                                    font-size: ${item.text_font_size};
                                    color: ${item.text_font_color};
                                }

                                .styles-1 {
                                    position: absolute;
                                    left: 5px;
                                    top: 5px;
                                    z-index: 2;
                                }

                                .styles-2 {
                                    position: absolute;
                                    left: 50%;
                                    transform: translate(-50%);
                                    top: 5px;
                                    z-index: 2;
                                }

                                .styles-3 {
                                    position: absolute;
                                    right: 5px;
                                    top: 5px;
                                    z-index: 2;

                                }

                                .styles-4 {
                                    position: absolute;
                                    left: 5px;
                                    top: 50%;
                                    transform: translate(0%, -50%);
                                    z-index: 2;
                                }

                                .styles-5 {
                                    position: absolute;
                                    left: 50%;
                                    top: 50%;
                                    transform: translate(-50%, -50%);
                                    z-index: 2;
                                }

                                .styles-6 {
                                    position: absolute;
                                    right: 5px;
                                    top: 50%;
                                    transform: translate(0%, -50%);
                                    z-index: 2;
                                }

                                .styles-7 {
                                    position: absolute;
                                    left: 5px;
                                    bottom: 5px;
                                    z-index: 2;
                                }

                                .styles-8 {
                                    position: absolute;
                                    left: 50%;
                                    transform: translate(-50%);
                                    bottom: 5px;
                                    z-index: 2;
                                }

                                .styles-9 {
                                    position: absolute;
                                    right: 5px;
                                    bottom: 5px;
                                    z-index: 2;
                                }

                                .styles-10 {
                                    margin-left: 5px;
                                    margin-right: 10px;
                                }
                              
                                @media screen and (max-width: 768px) {
                                    .top-small {
                                        top: 50px;
                                    }
                                    
                                    .with-thumbnail-product {
                                        left: 20px;
                                    }
                                    
                                    .with-thumbnail-product-right {
                                        right: 20px;
                                    }

                                    .product-right {
                                        right: 10px;
                                    }
                                }

                                @media screen and (min-width: 769px) {
                                    
                                    .with-thumbnail-product {
                                        left: 30px;
                                    }
                                    
                                    .with-thumbnail-product-right {
                                        right: 50px;
                                    }

                                    .product-right {
                                        right: 20px;
                                    }
                                }
                            `}
                        </style>
                    </div>
                ))
            }
        </>
    );
};

export default WeltpixelLabelView;
