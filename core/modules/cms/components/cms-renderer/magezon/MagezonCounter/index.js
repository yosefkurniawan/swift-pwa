import React from 'react';
import ProgressBar from '@core_modules/cms/components/cms-renderer/magezon/MagezonCounter/components/ProgressBarLayout';
import CircleLayout from '@core_modules/cms/components/cms-renderer/magezon/MagezonCounter/components/CircleLayout';
import NumberLayout from '@core_modules/cms/components/cms-renderer/magezon/MagezonCounter/components/NumberLayout';

const MagezonCounter = (props) => {
    const {
        icon,
        bar_color,
        layout,
        number_prefix,
        after_number_text,
        before_number_text,
        number_text,
        number_suffix,
        circle_size,
    } = props;

    let content = '';
    if (layout === 'circle') {
        content = (
            <CircleLayout
                {...props}
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
