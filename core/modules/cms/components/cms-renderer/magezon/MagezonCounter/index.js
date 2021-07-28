import React from 'react';
import ProgressBar from '@core_modules/cms/components/cms-renderer/magezon/MagezonCounter/components/ProgressBarLayout';
import CircleLayout from '@core_modules/cms/components/cms-renderer/magezon/MagezonCounter/components/CircleLayout';
import NumberLayout from '@core_modules/cms/components/cms-renderer/magezon/MagezonCounter/components/NumberLayout';

const MagezonCounter = (props) => {
    const {
        icon,
        number,
        bar_color,
        layout,
        number_prefix,
        after_number_text,
        before_number_text,
        number_text,
        number_suffix,
        circle_size,
        number_size,
    } = props;
    const [progress, setProgress] = React.useState(0);

    /* eslint-disable */
    React.useEffect(() => {
        if (progress !== number) {
            const timer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress >= number ? 0 : prevProgress + 1));
            }, 10);
            return () => {
                clearInterval(timer);
            };
        }
    }, [progress]);
    /* eslint-enable */

    let content = '';
    if (layout === 'circle') {
        content = (
            <CircleLayout
                {...props}
                progress={progress}
            />
        );
    } else if (layout === 'bars') {
        content = (
            <div className="bar-wrapper">
                <ProgressBar
                    icon={icon}
                    afterText={after_number_text}
                    beforeText={before_number_text}
                    prefix={number_prefix}
                    suffix={number_suffix}
                    bgcolor={bar_color}
                    progress={progress}
                    height={60}
                    title={number_text}
                />
            </div>
        );
    } else {
        content = (
            <NumberLayout
                {...props}
            />
        );
    }

    return (
        <div>
            <div className="progress-wrapper">{content}</div>
            <style jsx global>
                {`
                    .progress-wrapper {
                        width: auto;
                        margin-bottom: 1rem;
                        margin-top: 1rem;
                    }
                    .circle-container {
                        margin-top: 1rem;
                        margin-bottom: 1rem;
                        width: ${circle_size}px;
                        height: ${circle_size}px;
                    }
                    .circle-wrapper {
                        position: relative;
                        display: flex;
                        width: ${circle_size}px;
                        height: ${circle_size}px;
                    }
                    .content-circle {
                        position: absolute;
                        display: flex;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        justify-content: center;
                        align-items: center;
                        flex-direction: row;
                        font-size: ${number_size}px;
                    }
                    .icon-circle {
                        margin-top: -20px;
                    }
                    .bar-wrapper {
                        width: 100%;
                        height: 20px;
                    }
                    .number-wrapper {
                        width: ${circle_size}px;
                        height: ${circle_size}px;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                    }
                    .number-container {
                        display: flex;
                        flex-direction: column;
                        width: ${circle_size}px;
                        height: ${circle_size}px;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonCounter;
