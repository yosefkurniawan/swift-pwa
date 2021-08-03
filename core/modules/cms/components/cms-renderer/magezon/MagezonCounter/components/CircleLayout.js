/* eslint-disable no-mixed-operators */

import React from 'react';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';
import Typography from '@common_typography';

const CircleLayout = (props) => {
    // prettier-ignore
    const {
        icon,
        speed, delay, linecap,
        number, number_color,
        number_prefix, number_suffix, number_size,
        number_text, number_type,
        after_number_text, after_text_color, after_text_size,
        before_number_text, before_text_color, before_text_size,
        circle_background_color, circle_color1, circle_color2,
        circle_dash_width, circle_size,
    } = props;

    const transitionDuration = speed * 1000;
    const circleSize = circle_size || 200;
    const circleXYPos = circle_size / 2 || 100;
    const circleRadius = circle_size / 2 - 10 || 90;
    const animationDelay = delay * 1000 || 1000;
    let strokeTimeout;
    let numberTimeout;

    const increaseNumber = (note, classname) => {
        const element = document.querySelector(`.percent__${classname}`);
        const decPoint = classname === 'int' ? '.' : '';
        const interval = transitionDuration / Math.min(note, 100);
        let counter = 0;

        const timer = setInterval(() => {
            if (counter === note) {
                clearInterval(timer);
            }
            element.textContent = counter + decPoint;
            counter += 1;
        }, interval);
    };

    const strokeTransition = (note) => {
        const progress = document.querySelector('.circle__progress--fill');
        const radius = progress.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = (circumference * (100 - note)) / 100;

        progress.style.setProperty('--initialStroke', circumference);
        progress.style.setProperty('--transitionDuration', `${transitionDuration}ms`);

        strokeTimeout = setTimeout(() => {
            progress.style.strokeDashoffset = offset;
        }, animationDelay);
    };

    React.useEffect(() => {
        const note = parseFloat(Math.min(number, 100));
        let [int, dec] = note.toFixed(2).split('.');
        [int, dec] = [Number(int), Number(dec)];

        strokeTransition(note);

        if (!number_text || number_text === '') {
            numberTimeout = setTimeout(() => {
                increaseNumber(int, 'int');
                if (Number(dec) !== 0) {
                    increaseNumber(dec, 'dec');
                }
            }, animationDelay);
        }

        return () => {
            clearTimeout(strokeTimeout);
            clearTimeout(numberTimeout);
        };
    }, []);

    return (
        <div className="mgz-counter-circle-container">
            <div className="mgz-counter-circle-wrapper">
                <svg height={circleSize} width={circleSize} className="circle__svg">
                    <circle cx={circleXYPos} cy={circleXYPos} r={circleRadius} className="circle__progress circle__progress--path" />
                    <circle cx={circleXYPos} cy={circleXYPos} r={circleRadius} className="circle__progress circle__progress--fill" />
                </svg>
                <div className="mgz-counter-circle-inner">
                    {before_number_text && (
                        <Typography align="center" variant="p" className="before-number">
                            {before_number_text}
                        </Typography>
                    )}
                    {number_prefix && (
                        <Typography align="center" variant="p" style={{ fontSize: '12px' }}>
                            {number_prefix}
                        </Typography>
                    )}
                    {number_text || icon ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {number_text && (
                                <Typography variant="h1" type="bold">
                                    {number_text}
                                </Typography>
                            )}
                            {icon && <MagezonIcon icon={icon} icon_size={number_size} />}
                        </div>
                    ) : (
                        <div className="percent">
                            <span className="percent__int">0.</span>
                            <span className="percent__dec">00</span>
                            {number_type === 'percent' && <span className="percent_symbol">%</span>}
                        </div>
                    )}
                    {number_suffix && (
                        <Typography align="center" variant="p" style={{ fontSize: '12px' }}>
                            {number_suffix}
                        </Typography>
                    )}
                    {after_number_text && (
                        <Typography align="center" variant="p" className="after-number">
                            {after_number_text}
                        </Typography>
                    )}
                </div>
            </div>

            <style jsx>
                {`
                    .mgz-counter-circle-container {
                        display: flex;
                    }
                    .circle__progress {
                        fill: none;
                        stroke-width: ${circle_dash_width || 10};
                        stroke-linecap: ${linecap};
                    }
                    .mgz-counter-circle-wrapper {
                        position: relative;
                    }
                    .mgz-counter-circle-inner {
                        width: 100%;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        font-weight: 500;
                        text-align: center;
                        line-height: 28px;
                        transform: translate(-50%, -50%);
                    }
                    .percent {
                        color: ${number_color || '#000000'};
                    }
                    .percent__int {
                        font-size: 28px;
                    }
                    .percent__dec {
                        font-size: 12px;
                    }
                    .circle__progress--path {
                        fill: ${circle_background_color};
                        stroke: ${circle_color2};
                    }
                    .circle__progress--fill {
                        --initialStroke: 0;
                        --transitionDuration: 0;
                        stroke: ${circle_color1};
                        stroke-dasharray: var(--initialStroke);
                        stroke-dashoffset: var(--initialStroke);
                        transition: stroke-dashoffset var(--transitionDuration) linear;
                    }
                    .circle__svg {
                        transform: rotate(-90deg);
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .mgz-counter-circle-inner .before-number {
                        font-size: ${before_text_size ? `${before_text_size}px` : '14px'};
                        color: ${before_text_color || '#000000'};
                    }
                    .mgz-counter-circle-inner .after-number {
                        font-size: ${after_text_size ? `${after_text_size}px` : '14px'};
                        color: ${after_text_color || '#000000'};
                    }
                `}
            </style>
        </div>
    );
};

export default CircleLayout;
