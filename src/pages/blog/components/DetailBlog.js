import Typography from '@components/Typography';
import { BASE_URL, blog } from '@config';
import formatDate from '@helpers/date';
import Divider from '@material-ui/core/Divider';
import React from 'react';
import useStyles from '../style';
import ShareIcons from './ShareIcons';

export default ({
    title, publish_date, featured_image_url, featured_image_alt, content, id,
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
                <ShareIcons url={`${BASE_URL + blog.urlPath}/${id}`} />
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
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div className={styles.shareBottom}>
                <Typography>Share :</Typography>
                <ShareIcons url={`${BASE_URL + blog.urlPath}/${id}`} />
            </div>
        </div>
    );
};
