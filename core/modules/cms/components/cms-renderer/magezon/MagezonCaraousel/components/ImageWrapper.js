import React from 'react';

// eslint-disable-next-line object-curly-newline
const ImageWrapper = ({ children, hover_effect, item, overlay_color }) => {
    // image hover style
    let hoverClass = '';
    if (hover_effect === 'zoomin') {
        hoverClass += ' mgz-carousel-zoomin';
    }

    if (hover_effect === 'zoomout') {
        hoverClass += ' mgz-carousel-zoomout';
    }

    return (
        <div className="mgz-carousel-item-container">
            <div className={hoverClass}>
                {children}

                {item.title || item.description ? (
                    <div className="mgz-carousel-content-wrapper">
                        {item.title && <div className="mgz-carousel-content-title">{item.title}</div>}
                        {item.description && (
                            <div className="mgz-carousel-content-desc" style={{ marginTop: item.title ? 5 : 0 }}>
                                {item.description}
                            </div>
                        )}
                    </div>
                ) : null}
                {overlay_color && <div className="mgz-carousel-overlay" />}
            </div>
        </div>
    );
};

export default ImageWrapper;
