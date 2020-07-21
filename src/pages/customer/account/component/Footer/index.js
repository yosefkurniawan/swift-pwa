/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import Link from 'next/link';
import Button from '@Button';
import { removeIsLoginFlagging } from '@helpers/auth';
import { removeCartId } from '@helpers/cartId';
import { useApolloClient } from '@apollo/react-hooks';
import Router from 'next/router';
import {
    customerFeautres, custDataNameCookie, cmsSocialMediaLinkIdentifiers, enableSocialMediaLink,
} from '@config';
import Cookies from 'js-cookie';
import { GraphCms } from '@services/graphql';
import { removeToken as deleteToken } from '../../services/graphql';
import useStyles from './style';

export default ({ t, isLogin, storeConfig }) => {
    const { aw_blog_general_enabled: blog } = storeConfig;
    const styles = useStyles();
    const client = useApolloClient();
    const [deleteTokenGql] = deleteToken();
    const handleLogout = () => {
        deleteTokenGql().then(() => {
            Cookies.remove(custDataNameCookie);
            removeIsLoginFlagging();
            removeCartId();
            client.writeData({ data: { totalCart: 0 } });
            Router.push('/customer/account/login');
        }).catch(() => {
            //
        });
    };
    return (
        <div className={styles.account_block}>
            <ul className={styles.account_navigation}>
                <li className={styles.account_navigation_item}>
                    <Link href="/[...slug]" as="/about-us">
                        <a className={styles.account_navigation_link}>{t('customer:menu:aboutUs')}</a>
                    </Link>
                </li>
                <li className={styles.account_navigation_item}>
                    <Link href="/contact">
                        <a className={styles.account_navigation_link}>{t('customer:menu:contactUs')}</a>
                    </Link>
                </li>
                {
                    (blog === '1' || blog === 1 || blog === true) ? (
                        <li className={styles.account_navigation_item}>
                            <Link href="/blog">
                                <a className={styles.account_navigation_link}>{t('customer:menu:blog')}</a>
                            </Link>
                        </li>
                    ) : null

                }
                {
                    customerFeautres.confirmPayment ? (
                        <li className={styles.account_navigation_item}>
                            <Link href="/confirmpayment">
                                <a className={styles.account_navigation_link}>{t('customer:menu:confirmPayment')}</a>
                            </Link>
                        </li>
                    ) : null
                }
                <li className={styles.account_navigation_item}>
                    <Link href="/sales/order/track">
                        <a className={styles.account_navigation_link}>{t('order:trackingOrder')}</a>
                    </Link>
                </li>
                {
                    isLogin
                        ? (
                            <li className={styles.account_navigation_item}>
                                <Button className={styles.account_navigation_link} onClick={handleLogout} variant="text">
                                    {t('customer:button:logout')}
                                </Button>
                            </li>
                        )
                        : null
                }
            </ul>
            {enableSocialMediaLink && <SocialMediaLink />}
        </div>
    );
};

const SocialMediaLink = () => {
    const { error, loading, data } = GraphCms.getCmsBlocks({ identifiers: [cmsSocialMediaLinkIdentifiers] });
    if (error) return <div>{`Error: ${JSON.stringify(error)}`}</div>;
    if (loading) return <div>Loading</div>;

    return (
        <>
            <style jsx>
                {`
                    .cms-container {
                        text-align: center;
                        padding: 48px;
                        font-size: 24px;
                    }
                    .cms-container :global(.social-media-links) {
                        display: inline-block;
                        background-color: #f2f2f2;
                        padding: 8px 12px;
                        border-radius: 8px;
                    }
                    .cms-container :global(.social-icon) {
                        padding: 0 6px;
                        vertical-align: middle;
                        display: inline-block;
                    }
                    .cms-container :global(.social-icon i:before){
                        content: '';
                        background-position: center;
                        background-size: contain;
                        width: 40px;
                        height: 40px;
                        display: block;
                    }
                    .cms-container :global(.social-icon .icon-facebook:before){
                        background-image: url(/assets/img/facebook.png);
                    }
                    .cms-container :global(.social-icon .icon-twitter:before){
                        background-image: url(/assets/img/twitter.png);
                    }
                    .cms-container :global(.social-icon .icon-instagram:before){
                        background-image: url(/assets/img/instagram.png);
                    }
                    .cms-container :global(.social-icon .icon-pinterest:before){
                        background-image: url(/assets/img/pinterest.png);
                    }
                `}
            </style>
            <div
                className="cms-container"
                dangerouslySetInnerHTML={{ __html: data.cmsBlocks.items[0].content }}
            />
        </>
    );
};
