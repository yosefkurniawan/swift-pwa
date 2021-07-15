import React from 'react';
import MagezonLink from '@core_modules/cms/components/cms-renderer/magezon/MagezonLink';

const MagezonIcon = (props) => {
    const {
        link_url, icon_size, icon, align,
    } = props;
    const classIcon = 'magezone-icon ';
    let iconSize = '';
    let customUrl = '';
    let iconRes = '';
    if (icon.includes('fab') === true) iconRes += icon.replace('fab mgz-', 'fab ');
    if (icon.includes('fas') === true) iconRes += icon.replace('fas mgz-', 'fa ');
    if (icon_size === 'md') iconSize += '20px';
    if (icon_size === 'xs') iconSize += '16px';
    if (icon_size === 'sm') iconSize += '18px';
    if (icon_size === 'lg') iconSize += '24px';
    if (icon_size === 'xl') iconSize += '40px';
    if (link_url) customUrl = link_url;

    return (
        <div className={classIcon}>
            <div className="wrapperIcon">
                <MagezonLink link={customUrl}>
                    <i className={iconRes} />
                </MagezonLink>
            </div>
            <style jsx global>
                {`
                    .magezon-icon {
                        width: 100%;
                        margin-bottom: 20px;
                    }
                    .wrapperIcon {
                        display: flex;
                        justify-content: ${align};
                        font-size: ${iconSize};
                        margin-left: 5px;
                        margin-right: 5px;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonIcon;
