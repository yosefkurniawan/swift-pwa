/* eslint-disable no-nested-ternary */
import useStyles from '@core_modules/product/pages/default/components/SharePopup/style';
import { getHost } from '@helper_config';
import { shareIconConfig } from '@services/graphql/repository/pwa_config';
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

const ItemShare = (props) => {
    const { link = getHost() } = props;
    const styles = useStyles();

    let shareIcon = {};

    const { data: dataConfigIcon, loading } = shareIconConfig();

    if (!loading && dataConfigIcon && dataConfigIcon.storeConfig && dataConfigIcon.storeConfig.pwa) {
        shareIcon = {
            ...dataConfigIcon.storeConfig.pwa,
        };
    }

    const data = Object.entries(shareIcon);
    return (
        <>
            {data.map((item, key) =>
                (item[0] === 'share_icon_facebook' && item[1] === true ? (
                    <FacebookShareButton url={link} key={key} className={styles.shareIcon}>
                        <FacebookIcon size={30} round />
                    </FacebookShareButton>
                ) : item[0] === 'share_icon_twitter' && item[1] === true ? (
                    <TwitterShareButton url={link} key={key} className={styles.shareIcon}>
                        <TwitterIcon size={30} round />
                    </TwitterShareButton>
                ) : item[0] === 'share_icon_line' && item[1] === true ? (
                    <LineShareButton url={link} key={key} className={styles.shareIcon}>
                        <LineIcon size={30} round />
                    </LineShareButton>
                ) : item[0] === 'share_icon_pinterest' && item[1] === true ? (
                    <PinterestShareButton url={link} key={key} className={styles.shareIcon}>
                        <PinterestIcon size={30} round />
                    </PinterestShareButton>
                ) : item[0] === 'share_icon_telegram' && item[1] === true ? (
                    <TelegramShareButton url={link} key={key} className={styles.shareIcon}>
                        <TelegramIcon size={30} round />
                    </TelegramShareButton>
                ) : item[0] === 'share_icon_email' && item[1] === true ? (
                    <EmailShareButton url={link} key={key} className={styles.shareIcon}>
                        <EmailIcon size={30} round />
                    </EmailShareButton>
                ) : (
                    item[0] === 'share_icon_linkedin'
                    && item[1] === true && (
                        <LinkedinShareButton url={link} key={key} className={styles.shareIcon}>
                            <LinkedinIcon size={30} round />
                        </LinkedinShareButton>
                    )
                )))}
        </>
    );
};

export default ItemShare;
