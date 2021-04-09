import React from 'react';
import Link from 'next/link';

import Button from '@common_button';

const WidgetPwaLink = (props) => {
    const {
        link_type, type, image, url, text = 'Sample Link',
    } = props;

    if (!url) return <span>no url found in pwa link widget</span>;

    /**
     * [LINK] button
     * @return {link-button}
     */
    if (link_type === 'button') {
        return <Button href={url}>{text}</Button>;
    }

    /**
     * [LINK] image
     * @return {link}
     */
    if (link_type === 'image') {
        return (
            <Link href={url}>
                <img src={image} alt={`${type}-${link_type}`} />
            </Link>
        );
    }

    /**
     * [LINK] default || text
     * @return {link}
     */
    return (
        <Link href={url}>
            <a>{text}</a>
        </Link>
    );
};

export default WidgetPwaLink;
