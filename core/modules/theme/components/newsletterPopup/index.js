import WidgetNewsletterPopup from '@core_modules/cms/components/cms-renderer/widget-newsletter-popup/index';
import useStyles from '@core_modules/theme/components/newsletterPopup/style';
import { getCmsBlocks } from '@core_modules/theme/services/graphql';
import { breakPointsUp } from '@helper_theme';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import { useState } from 'react';

const NewsletterPopup = (props) => {
    const { storeConfig } = props;
    const { data } = getCmsBlocks({
        identifiers: 'weltpixel_newsletter_v5',
    });

    const desktop = breakPointsUp('sm');

    const [open, setOpen] = useState(!Cookies.get('newsletter_closed'));
    const triggerButtonColors = {
        color: storeConfig.weltpixel_newsletter_general_trigger_button_color,
        bgColor: storeConfig.weltpixel_newsletter_general_trigger_button_backgroundcolor,
    };
    const styles = useStyles(triggerButtonColors);

    // 1 minute
    const expires = new Date(new Date().getTime() + 1 * 60 * 1000);

    const handleClose = () => {
        Cookies.set('newsletter_closed', true, { expires });
        setOpen(!open);
    };

    if (storeConfig.weltpixel_newsletter_general_display_mobile === '0' && !desktop) return null;

    return (
        <div>
            <Button className={styles.fab} onClick={() => setOpen(!open)} variant="contained">
                {storeConfig.weltpixel_newsletter_general_trigger_button_title}
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                {data ? (
                    <div className={classNames(styles.newsletter, 'cms-container')}>
                        <WidgetNewsletterPopup storeConfig={storeConfig} data={data} />
                    </div>
                ) : null}
            </Dialog>
        </div>
    );
};

export default NewsletterPopup;
