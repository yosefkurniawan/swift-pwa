/* eslint-disable no-nested-ternary */
import React from 'react';
import Typography from '@common_typography';
import Link from '@material-ui/core/Link';

const MagezonInstagramFeedView = (props) => {
    const {
        xs_hide, sm_hide, md_hide, lg_hide, title, title_tag,
        title_align, line_position, line_color, line_width, title_color,
        link_text, instagram_username, data, max_items,
        item_lg, item_md, item_sm, item_xs, gap, hover_effect,
    } = props;
    let classInstagram = 'magezon-instagram ';
    if (xs_hide) classInstagram += 'hidden-mobile ';
    if (sm_hide) classInstagram += 'hidden-sm ';
    if (md_hide) classInstagram += 'hidden-md ';
    if (lg_hide) classInstagram += 'hidden-lg ';

    let classItem = '';

    if (item_xs && item_xs !== '') classItem += `col-xs-${(12 / item_xs).toFixed(0)} `;
    if (item_sm && item_sm !== '') classItem += `col-sm-${(12 / item_sm).toFixed(0)} `;
    if (item_md && item_md !== '') classItem += `col-md-${(12 / item_md).toFixed(0)} `;
    if (item_lg && item_lg !== '') classItem += `col-lg-${(12 / item_lg).toFixed(0)} `;

    return (
        <div className={classInstagram}>
            <div className="magezone-title-instagram-box">
                <Typography
                    variant={title_tag}
                    align={title_align}
                    className="magezon-title-instagram"
                >
                    {title}
                </Typography>
            </div>
            <div className="row">
                {
                    data && data.length > 0 && data.map((item, key) => (key < max_items ? (
                        <div
                            key={item}
                            className={`${classItem} magezon-instagram-item`}
                        >
                            <picture>
                                <img
                                    className="magezon-instagram-img"
                                    data-pagespeed-no-defer
                                    src={item.media_url}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/assets/img/placeholder.png';
                                    }}
                                    alt={item.id}
                                />

                            </picture>
                        </div>
                    ) : null))
                }
            </div>

            <Link
                href={`https://instagram.com/${instagram_username}`}
                target="_blank"
                color="inherit"
                underline="none"
            >
                <Typography
                    variant="span"
                    letter="capitalize"
                    size="14"
                >
                    {link_text}
                </Typography>
            </Link>
            <style jsx global>
                {`
                    .magezon-instagram-item {
                        overflow: hidden !important;
                        margin: ${gap ? hover_effect === 'zoomin' ? gap / 2 : gap / 4 : 0}px 0px;
                    }
                    .magezon-instagram-img {
                        object-fit: cover;
                        width: 100%;
                        ${
        hover_effect === 'zoomin'
            ? ` transition: transform 1s, filter 2s ease-in-out;
            transform: scale(1.1);` : hover_effect === 'zoomout'
                ? `transform-origin: 0 0;
                                        transition: transform .25s, visibility .25s ease-in;`
                : ''
        }
                    }
                    .magezon-instagram-img:hover {
                        ${
        hover_effect === 'zoomin'
            ? ' transform: scale(1);' : hover_effect === 'zoomout'
                ? `
                                    transform: scale(1.1);`
                : ''
        }
                    }
                    .magezon-instagram {
                        width: 100%;
                        margin-bottom: 20px;
                    }
                    .magezone-title-instagram-box {
                        width:100%;
                        text-align:${title_align}; 
                        position: relative;
                        margin-bottom: 10px;
                    }
                    .magezon-title-instagram {        
                        position:relative; 
                        padding:12px;
                        color: ${title_color};
                        background: #fff;
                        display: inline-block;
                        text-transform: uppercase;
                        z-index: 1
                    }
                    .magezone-title-instagram-box::after {
                        content:'';
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: ${line_position === 'center' ? '50%' : '100%'};
                        height: ${line_width}px;
                        background: ${line_color};
                        z-index:0;
                     } 
                `}
            </style>
        </div>
    );
};

export default MagezonInstagramFeedView;
