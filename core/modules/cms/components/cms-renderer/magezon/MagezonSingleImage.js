/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Thumbor from '@common_image';
import Link from '@material-ui/core/Link';
import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@root/core/helpers/env';

const MagezonSingleImage = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide,
        source, custom_src, image, alt_tag, image_width, image_height,
    } = props;
    let classes = '';
    if (xs_hide) classes += 'hidden-mobile ';
    if (sm_hide) classes += 'hidden-sm ';
    if (md_hide) classes += 'hidden-md ';
    if (lg_hide) classes += 'hidden-lg ';
    const handleClick = () => {};
    return (
        <div className={classes}>
            <Link onClick={handleClick}>
                <Thumbor
                // eslint-disable-next-line no-nested-ternary
                    src={custom_src || ((image && source === 'media_library')
                        ? `${getStoreHost(getAppEnv())}media/${image}`
                        : '/assets/img/placeholder.png')}
                    className="magezone-single-image"
                    quality={80}
                    width={image_width.replace('px', '') || 320}
                    height={image_height.replace('px', '') || 320}
                    alt={alt_tag || 'magezon image'}
                    lazy
                />
            </Link>
        </div>
    );
};

export default MagezonSingleImage;
