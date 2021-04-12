/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Link from 'next/link';

import Button from '@common_button';

const WidgetPwaLink = (props) => {
    const {
        pwa_link_type, type, image, url, text = 'Sample Link',
    } = props;
    const customStyle = props?.class;
    if (!url) return <span>no url found in pwa link widget</span>;

    const propsOther = {};
    if (customStyle !== undefined) {
        propsOther.className = customStyle;
    }
    /**
     * [LINK] button
     * @return {link-button}
     */
    if (pwa_link_type === 'button') {
        return (
            <Button {...propsOther} href={url}>
                {text}
            </Button>
        );
    }

    /**
     * [LINK] image
     * @return {link}
     */
    if (pwa_link_type === 'image') {
        return (
            <Link href={url}>
                <img {...propsOther} src={image} alt={`${type}-${pwa_link_type}`} />
            </Link>
        );
    }

    /**
     * [LINK] default || text
     * @return {link}
     */
    return (
        <Link href={url}>
            <a {...propsOther}>{text}</a>
        </Link>
    );
};

export default WidgetPwaLink;
