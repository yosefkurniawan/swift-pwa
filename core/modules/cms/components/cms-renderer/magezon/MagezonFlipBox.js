import React from 'react';
import { getStoreHost } from '@helpers/config';
import Typography from '@common_typography';
import MagezonButton from '@core_modules/cms/components/cms-renderer/magezon/MagezonButton';

const MagezonFlipBox = (props) => {
    const {
        primary_image,
        primary_text,
        primary_title,
        primary_background_color,
        primary_align,
        title_font_size,
        title_font_weight,
        hover_align,
        hover_background_color,
        hover_text,
        hover_title,
        flip_direction,
        hover_image,
        box_min_height,
        hover_color,
        hover_border_color,
        box_border_width,
        primary_color,
        primary_border_color,
        button_link,
        button_size,
        button_title,
        enable_button,
    } = props;

    const flipValue = () => {
        switch (flip_direction) {
        case 'up':
            return 'rotateX(180deg)';
        case 'right':
            return 'rotateY(180deg)';
        case 'left':
            return 'rotateY(-180deg)';
        default:
            return 'rotateX(-180deg)';
        }
    };

    const buttonAligment = () => {
        let align = '';
        switch (hover_align) {
        case 'left':
            align = 'flex-start'; break;
        case 'center':
            align = 'center'; break;
        case 'right':
            align = 'flex-end'; break;
        default:
            align = 'flex-start';
        }
        return align;
    };
    /* eslint-disable */
    return (
        <div>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <div className="primary-content">
                            <Typography
                                align={primary_align}
                                variant="h1"
                                type="bold"
                                style={{ fontSize: Number(title_font_size), fontWeight: Number(title_font_weight) }}
                            >
                                {primary_title}
                            </Typography>
                            <div style={{ textAlign: primary_align, marginTop: '5px' }}>
                                <div dangerouslySetInnerHTML={{ __html: primary_text }} />
                            </div>
                        </div>
                    </div>
                    <div className="flip-card-back">
                        <div className="hover-content">
                            <Typography
                                align={hover_align}
                                variant="h1"
                                type="bold"
                                style={{ fontSize: Number(title_font_size), fontWeight: Number(title_font_weight) }}
                            >
                                {hover_title}
                            </Typography>
                            <div style={{ textAlign: hover_align, marginTop: '5px' }}>
                                <div dangerouslySetInnerHTML={{ __html: hover_text }} />
                            </div>
                            {enable_button ? (
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: buttonAligment(), marginTop: '5px', width: '100%' }}>
                                    <MagezonButton title={button_title} link={button_link} button_size={button_size} {...props} />{' '}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>
                {`
                    .flip-card {
                        background-color: transparent;
                        width: 92vw;
                        height: ${box_min_height}px;
                        perspective: 1000px;
                    }

                    .flip-card-inner {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        text-align: center;
                        transition: transform 0.6s;
                        transform-style: preserve-3d;
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                    }

                    .flip-card:hover .flip-card-inner {
                        transform: ${flipValue()};
                    }

                    .flip-card-front,
                    .flip-card-back {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        -webkit-backface-visibility: hidden;
                        backface-visibility: hidden;
                    }

                    .flip-card-front {
                        background-color: #bbb;
                        color: black;
                    }

                    .flip-card-back {
                        background-color: #2980b9;
                        color: white;
                        transform: ${flipValue()};
                    }

                    .primary-content {
                        width: 92vw;
                        height: ${box_min_height}px;
                        background-image: url('${getStoreHost()}media/${primary_image}');
                        background-color: ${primary_background_color};
                        background-repeat: no-repeat;
                        background-size: cover;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: ${primary_align};
                        color: ${primary_color || 'black'};
                        border-color: ${primary_border_color};
                        border-style: solid;
                        border-width: ${box_border_width}
                        padding: 10px 10px 10px 10px;
                    }
                    
                    .hover-content {
                        width: 92vw;
                        height: ${box_min_height}px;
                        background-image: url('${getStoreHost()}media/${hover_image}');
                        background-color: ${hover_background_color};
                        background-repeat: no-repeat;
                        background-size: cover;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: ${hover_align};
                        color: ${hover_color || 'black'};
                        border-color: ${hover_border_color};
                        border-style: solid;
                        border-width: ${box_border_width}
                    }
                `}
            </style>
        </div>
    );
    /* eslint-enable */
};

export default MagezonFlipBox;
