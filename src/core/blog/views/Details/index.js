/* eslint-disable react/no-danger */
import Typography from '@Typography';
import { blog } from '@config';
import formatDate from '@helpers/date';
import { getHost } from '@helpers/config';
import Divider from '@material-ui/core/Divider';
import React from 'react';
import Button from '@Button';
import Link from 'next/link';
import useStyles from './style';
import ShareIcons from '../ShareIcon';
import { linkDetail } from '../../config';

export default ({
    title, publish_date, featured_image_url, featured_image_alt, content, url_key,
    short_content, short = true,
}) => {
    const styles = useStyles();
    return (
        <div className={styles.containerItemBlog}>
            <Typography variant="h1" className={styles.itemTitle} letter="capitalize">
                {title}
            </Typography>
            <div className={styles.dateShare}>
                <Typography variant="p">{formatDate(publish_date || Date.now())}</Typography>
                <Divider orientation="vertical" flexItem />
                <ShareIcons url={`${getHost() + blog.urlPath}/${url_key}`} />
            </div>
            <div className={styles.imageBlogContainer}>
                <img
                    src={featured_image_url}
                    alt={featured_image_alt}
                    className={styles.imageBlog}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/img/placeholder.png';
                    }}
                />
            </div>
            {
                !short
                    ? (
                        <>
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                            <div className={styles.shareBottom}>
                                <Typography>Share :</Typography>
                                <ShareIcons url={`${getHost() + blog.urlPath}/${url_key}`} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div dangerouslySetInnerHTML={{ __html: short_content }} />
                            <Link href={linkDetail.href} as={linkDetail.as + url_key}>
                                <a>
                                    <Button>
                                        <Typography color="white" letter="capitalize" varinat="span" type="semiBold">
                                            Read More
                                        </Typography>
                                    </Button>
                                </a>
                            </Link>
                        </>
                    )
            }
        </div>
    );
};
