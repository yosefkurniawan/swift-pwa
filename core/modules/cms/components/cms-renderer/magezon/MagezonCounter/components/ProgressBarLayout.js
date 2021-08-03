/* eslint-disable no-nested-ternary */

import React from 'react';
import MagezonIcon from '@core_modules/cms/components/cms-renderer/magezon/MagezoneIcon';
import Typography from '@common_typography';

const CounterBarText = (props) => {
    const {
        number_prefix, number_text, icon, number_size, hasDecimals, number_type, number_suffix,
    } = props;

    return (
        <>
            <div className="mgz-counter-bar-text">
                {number_prefix && (
                    <Typography variant="p" style={{ fontSize: '12px' }}>
                        {number_prefix}
                    </Typography>
                )}
                {number_text || icon ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {number_text && <Typography variant="h1">{number_text}</Typography>}
                        {icon && <MagezonIcon icon={icon} icon_size={number_size} />}
                    </div>
                ) : (
                    <div className="percent">
                        <span className="percent__int">0.</span>
                        {hasDecimals && <span className="percent__dec">00</span>}
                        {number_type === 'percent' && <span className="percent_symbol">%</span>}
                    </div>
                )}
                {number_suffix && (
                    <Typography variant="p" style={{ fontSize: '12px' }}>
                        {number_suffix}
                    </Typography>
                )}
            </div>
        </>
    );
};

const ProgressBarLayout = (props) => {
    // prettier-ignore
    const {
        icon,
        delay, speed, bar_color,
        number, number_text, number_type,
        number_prefix, number_suffix, number_size,
        number_position, max,
        after_number_text, before_number_text,
    } = props;
    let timeout;
    const numberProgress = parseFloat(Math.min(number, number_type !== 'percent' ? max || number : 100));
    const transitionDuration = speed * 3000;
    const animationDelay = delay * 1000 || 1000;
    let hasDecimals = numberProgress.toFixed(2).split('.');
    hasDecimals = hasDecimals.length > 1 && Number(hasDecimals[1]) !== 0;
    const counterTextContent = (
        <CounterBarText
            hasDecimals={hasDecimals}
            icon={icon}
            number_text={number_text}
            number_type={number_type}
            number_prefix={number_prefix}
            number_suffix={number_suffix}
            number_size={number_size}
        />
    );

    const increaseNumber = (note, classname) => {
        const element = document.querySelector(`.percent__${classname}`);
        const decPoint = classname === 'int' ? '.' : '';
        const interval = transitionDuration / Math.min(note, 100);
        let counter = 0;

        const timer = setInterval(() => {
            if (counter === note) {
                clearInterval(timer);
            }

            if (hasDecimals) {
                element.textContent = counter + decPoint;
            } else {
                element.textContent = counter;
            }
            counter += 1;
        }, interval);
    };

    const progressTransition = () => {
        const element = document.querySelector('.mgz-counter-bar-text-container');

        element.style.setProperty('transition-duration', `${transitionDuration}ms`);

        timeout = setTimeout(() => {
            element.style.width = number_type !== 'percent'
                ? max
                    ? `${number}%`
                    : '100%'
                : `${number}%`;
        }, animationDelay);
    };

    React.useEffect(() => {
        let [int, dec] = numberProgress.toFixed(2).split('.');
        [int, dec] = [Number(int), Number(dec)];

        progressTransition();
        increaseNumber(int, 'int');
        if (hasDecimals) {
            increaseNumber(dec, 'dec');
        }

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <>
            <div className="mgz-counter-bar-container">
                <div className="mgz-counter-bar-wrapper">
                    <Typography variant="p" className="before-number">
                        {before_number_text}
                    </Typography>
                    {number_position === 'above' && counterTextContent}
                    <div className="mgz-counter-bar-inner">
                        <div className="mgz-counter-bar-text-container">{number_position === 'inside' && counterTextContent}</div>
                    </div>
                    {number_position === 'bellow' && counterTextContent}
                    <Typography variant="p" className="after-number">
                        {after_number_text}
                    </Typography>
                </div>
            </div>
            <style jsx>
                {`
                    .mgz-counter-bar-container {
                        width: 100%;
                    }
                    .mgz-counter-bar-wrapper {
                        display: flex;
                        flex-direction: column;
                    }
                    .mgz-counter-bar-inner {
                        height: 60px;
                        width: 100%;
                        background-color: whitesmoke;
                        margin: 0;
                    }
                    .mgz-counter-bar-text-container {
                        position: relative;
                        height: 100%;
                        width: 0;
                        background-color: ${bar_color};
                        border-radius: 0;
                        text-align: right;
                        transition: width 0 linear;
                    }
                `}
            </style>
            <style jsx global>
                {`
                    .mgz-counter-bar-container .mgz-counter-bar-text {
                        display: flex;
                        flex-direction: row;
                        justify-content: ${number_position === 'inside' ? 'flex-end' : 'flex-start'};
                        align-items: center;
                        height: 100%;
                    }
                `}
            </style>
        </>
    );
};

export default ProgressBarLayout;
