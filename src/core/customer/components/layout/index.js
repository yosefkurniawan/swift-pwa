import { modules } from '@config';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import useStyles from './style';

const Layout = (props) => {
    const {
        children, wishlist, t,
    } = props;
    const pushIf = (condition, ...elements) => (condition ? elements : []);
    const styles = useStyles();
    const router = useRouter();

    const menu = [
        { href: '/customer/account', title: t('customer:menu:myAccount') },
        { href: '/sales/order/history', title: t('customer:menu:myOrder') },
        { href: '/customer/account/profile', title: t('customer:menu:accountInformation') },
        { href: '/customer/account/address', title: t('customer:menu:address') },
        ...pushIf(wishlist && wishlist.length && modules.wishlist.enabled <= 0, {
            href: '/wishlist',
            title: 'Wishlist',
        }),
        ...pushIf(modules.giftcard.enabled, {
            href: '/awgiftcard/card',
            title: 'Gift Card',
        }),
        ...pushIf(modules.storecredit.enabled, {
            href: '/customer/account/storecredit',
            title: t('customer:menu:storeCredit'),
        }),
        ...pushIf(modules.notification.enabled, {
            href: '/inboxnotification/notification',
            title: t('notification:notification'),
        }),
        { href: '/customer/setting', title: t('customer:menu:setting') },
        ...pushIf(modules.rma.enabled, {
            href: '/rma/customer',
            title: t('customer:menu:return'),
        }),
    ];

    return (
        <div className="row">
            <div className="col-lg-2 col-xs-12 hidden-mobile">
                <div className={styles.listMenuContainer}>
                    <ul className={styles.listMenu}>
                        {menu.map((val, idx) => (
                            <li
                                key={idx}
                                className={
                                    router.asPath === val.href ? classNames(styles.listMenuItem, styles.listMenuItemActive) : styles.listMenuItem
                                }
                            >
                                <Link href={val.href}>
                                    <a>{val.title}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-lg-10 col-xs-12 col-sm-12">{children}</div>
        </div>
    );
};

export default Layout;
