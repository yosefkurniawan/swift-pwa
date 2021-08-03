import React from 'react';
import ProgressBar from '@core_modules/cms/components/cms-renderer/magezon/MagezonCounter/components/ProgressBarLayout';
import CircleLayout from '@core_modules/cms/components/cms-renderer/magezon/MagezonCounter/components/CircleLayout';
import NumberLayout from '@core_modules/cms/components/cms-renderer/magezon/MagezonCounter/components/NumberLayout';

const MagezonCounter = (props) => {
    const {
        layout,
        number_color,
        after_text_color, after_text_size,
        before_text_color, before_text_size,
    } = props;
    let content = '';

    if (layout === 'circle') {
        content = <CircleLayout {...props} />;
    } else if (layout === 'bars') {
        content = <ProgressBar height={60} {...props} />;
    } else {
        content = <NumberLayout {...props} />;
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
                    .progress-wrapper .before-number {
                        font-size: ${before_text_size ? `${before_text_size}px` : '14px'};
                        color: ${before_text_color || '#000000'};
                    }
                    .progress-wrapper .after-number {
                        font-size: ${after_text_size ? `${after_text_size}px` : '14px'};
                        color: ${after_text_color || '#000000'};
                    }
                    .progress-wrapper .percent {
                        color: ${number_color || '#000000'};
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonCounter;
