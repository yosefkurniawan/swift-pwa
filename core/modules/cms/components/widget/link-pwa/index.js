import React from 'react';
import Link from 'next/link';

const WidgetPwaLink = (props) => {
    const { cms, custom, label = 'Sample Link' } = props;

    const isCms = cms !== undefined;
    const isCustom = custom !== undefined;
    const url = cms !== undefined ? `/${cms}` : custom;

    if (!isCms && !isCustom) return <span>no url found in pwa link widget</span>;
    return (
        <Link href={url}>
            <a>{label}</a>
        </Link>
    );
};

export default WidgetPwaLink;
