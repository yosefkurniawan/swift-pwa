/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import Link from 'next/link';
import Button from '@common_button';
import router from 'next/router';
import { enableSocialMediaLink } from '@config';
import { setResolver, getResolver } from '@helper_localstorage';
import SocialMediaLink from '../SocialMedia';
import SocialMediaView from '../SocialMedia/view';
import NewsletterDialog from '../Newsletter';
import useStyles from './style';

const FooterView = (props) => {
    const styles = useStyles();
    const {
        t, isLogin, handleLogout, modules,
    } = props;
    const [openNewsletter, setOpenNewsletter] = React.useState(false);
    const handleClick = async (link) => {
        const urlResolver = getResolver();
        urlResolver[link] = {
            type: 'CMS_PAGE',
        };
        await setResolver(urlResolver);
        router.push('/[...slug]', link);
    };

    const handleToogleNewsletter = () => {
        setOpenNewsletter(!openNewsletter);
    };
    return (
        <div className={styles.account_block}>
            <NewsletterDialog open={openNewsletter} handleClose={handleToogleNewsletter} />
            <ul className={styles.account_navigation}>
                {modules.about.enabled ? (
                    <li className={styles.account_navigation_item}>
                        <>
                            <a onClick={() => handleClick('/about-us')} className={styles.account_navigation_link}>
                                {t('customer:menu:aboutUs')}
                            </a>
                        </>
                    </li>
                ) : null}

                {modules.contact.enabled ? (
                    <li className={styles.account_navigation_item}>
                        <Link href="/contact">
                            <a className={styles.account_navigation_link}>{t('customer:menu:contactUs')}</a>
                        </Link>
                    </li>
                ) : null}

                {modules.blog.enabled ? (
                    <li className={styles.account_navigation_item}>
                        <Link href="/blog">
                            <a className={styles.account_navigation_link}>{t('customer:menu:blog')}</a>
                        </Link>
                    </li>
                ) : null}
                {modules.confirmpayment.enabled ? (
                    <li className={styles.account_navigation_item}>
                        <Link href="/confirmpayment">
                            <a className={styles.account_navigation_link}>{t('customer:menu:confirmPayment')}</a>
                        </Link>
                    </li>
                ) : null}
                {modules.storeLocator.enabled ? (
                    <li className={styles.account_navigation_item}>
                        <Link href="/storelocator">
                            <a className={styles.account_navigation_link}>{t('customer:menu:findAStore')}</a>
                        </Link>
                    </li>
                ) : null}
                {modules.trackingorder.enabled ? (
                    <li className={styles.account_navigation_item}>
                        <Link href="/sales/order/track">
                            <a className={styles.account_navigation_link}>{t('customer:menu:trackingOrder')}</a>
                        </Link>
                    </li>
                ) : null}

                {modules.customer.plugin.newsletter.enabled ? (
                    <li className={styles.account_navigation_item}>
                        <Button className={styles.account_navigation_link} variant="text" onClick={handleToogleNewsletter}>
                            <a className={styles.account_navigation_link}>{t('common:newsletter:title')}</a>
                        </Button>
                    </li>
                ) : null}

                {modules.setting.enabled ? (
                    <li className={styles.account_navigation_item}>
                        <Link href="/setting">
                            <a className={styles.account_navigation_link}>{t('common:setting:title')}</a>
                        </Link>
                    </li>
                ) : null}

                {isLogin ? (
                    <li className={styles.account_navigation_item}>
                        <Button className={styles.account_navigation_link} onClick={handleLogout} variant="text">
                            {t('customer:button:logout')}
                        </Button>
                    </li>
                ) : null}
            </ul>
            {enableSocialMediaLink && <SocialMediaLink SocialMediaView={SocialMediaView} />}
        </div>
    );
};

export default FooterView;
