import Link from 'next/link';
import Button from '@components/Button';
import { removeIsLoginFlagging } from '@helpers/auth';
import { removeCartId } from '@helpers/cartId';
import { useDispatch } from 'react-redux';
import { setCountCart } from '@stores/actions/cart';
import Router from 'next/router';
import { customerFeautres, custDataNameCookie } from '@config';
import Cookies from 'js-cookie';
import { removeToken as deleteToken } from '../../services/graphql';
import useStyles from './style';

export default ({ t, isLogin, storeConfig }) => {
    const { aw_blog_general_enabled: blog } = storeConfig;
    const styles = useStyles();
    const dispatch = useDispatch();
    const [deleteTokenGql] = deleteToken();
    const handleLogout = () => {
        deleteTokenGql().then(() => {
            Cookies.remove(custDataNameCookie);
            removeIsLoginFlagging();
            removeCartId();
            dispatch(setCountCart(0));
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
        </div>
    );
};
