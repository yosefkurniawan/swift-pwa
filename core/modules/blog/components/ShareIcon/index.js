/* eslint-disable no-nested-ternary */
import React from 'react';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LineIcon,
    LineShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestIcon,
    PinterestShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
} from 'react-share';
import useStyles from '@core_modules/blog/components/ShareIcon/style';
import { shareIconConfig } from '@services/graphql/repository/pwa_config';

const ShareComp = ({ url }) => {
    const styles = useStyles();
    let shareIcon = {};

    const { data, loading } = shareIconConfig();

    if (!loading && data && data.storeConfig && data.storeConfig.pwa) {
        shareIcon = {
            ...data.storeConfig.pwa,
        };
    }

    const icons = Object.entries(shareIcon);
    return (
        <div className={styles.listShareIcon}>
            {icons.map((item, key) => (item[0] === 'share_icon_facebook' && item[1] === true ? (
                <FacebookShareButton url={url} key={key} className={styles.iconShare}>
                    <FacebookIcon size={16} />
                </FacebookShareButton>
            ) : item[0] === 'share_icon_twitter' && item[1] === true ? (
                <TwitterShareButton url={url} key={key} className={styles.iconShare}>
                    <TwitterIcon size={16} />
                </TwitterShareButton>
            ) : item[0] === 'share_icon_line' && item[1] === true ? (
                <LineShareButton url={url} key={key} className={styles.iconShare}>
                    <LineIcon size={16} />
                </LineShareButton>
            ) : item[0] === 'share_icon_pinterest' && item[1] === true ? (
                <PinterestShareButton url={url} key={key} className={styles.iconShare}>
                    <PinterestIcon size={16} />
                </PinterestShareButton>
            ) : item[0] === 'share_icon_telegram' && item[1] === true ? (
                <TelegramShareButton url={url} key={key} className={styles.iconShare}>
                    <TelegramIcon size={16} />
                </TelegramShareButton>
            ) : item[0] === 'share_icon_email' && item[1] === true ? (
                <EmailShareButton url={url} key={key} className={styles.iconShare}>
                    <EmailIcon size={16} />
                </EmailShareButton>
            ) : (
                item[0] === 'share_icon_linkedin'
                    && item[1] === true && (
                    <LinkedinShareButton url={url} key={key} className={styles.iconShare}>
                        <LinkedinIcon size={16} />
                    </LinkedinShareButton>
                )
            )))}
        </div>
    );
};

export default ShareComp;
