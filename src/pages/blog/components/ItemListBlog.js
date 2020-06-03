import Button from '@components/Button';
import Typography from '@components/Typography';
import { BASE_URL, blog } from '@config';
import formatDate from '@helpers/date';
import Divider from '@material-ui/core/Divider';
import React from 'react';
import Link from 'next/link';
import useStyles from '../style';
import ShareIcons from './ShareIcons';

export default ({
    id, title, publish_date, featured_image_alt, featured_image_url, short_content,
}) => {
    const styles = useStyles();
    return (
        <div className={styles.containerItemBlog}>
            <Link href="/blog/[id]" as={`/blog/${id}`}>
                <a>
                    <Typography variant="h1" className={styles.itemTitle} letter="capitalize">
                        {title}
                    </Typography>
                </a>
            </Link>
            <div className={styles.dateShare}>
                <Typography variant="p">{formatDate(publish_date || Date.now())}</Typography>
                <Divider orientation="vertical" flexItem />
                <ShareIcons url={`${BASE_URL + blog.urlPath}/${id}`} />
            </div>
            <Link href="/blog/[id]" as={`/blog/${id}`}>
                <a>
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
                </a>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: short_content }} />

            <Link href="/blog/[id]" as={`/blog/${id}`}>
                <a>
                    <Button>
                        <Typography color="white" letter="capitalize" varinat="span" type="semiBold">
                            Read More
                        </Typography>
                    </Button>
                </a>
            </Link>
        </div>
    );
};
