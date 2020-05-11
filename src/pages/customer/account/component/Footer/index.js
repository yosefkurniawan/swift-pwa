import Link from 'next/link';
import Button from '@components/Button';
import Router from 'next/router';
import { removeToken } from '@helpers/token';
import { removeCartId } from '@helpers/cartId';
import { useDispatch } from 'react-redux';
import { setCountCart } from '@stores/actions/cart';
import { removeToken as deleteToken } from '../../services/graphql';
import useStyles from './style';

export default ({ t, token }) => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const [deleteTokenGql] = deleteToken(token);
    const handleLogout = () => {
        deleteTokenGql().then(() => {
            removeToken();
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
                    <Link href="/about-us">
                        <a className={styles.account_navigation_link}>About Us</a>
                    </Link>
                </li>
                <li className={styles.account_navigation_item}>
                    <Link href="/contact">
                        <a className={styles.account_navigation_link}>Contact Us</a>
                    </Link>
                </li>
                {token && token !== '' && (
                    <li className={styles.account_navigation_item}>
                        <Button className={styles.account_navigation_link} onClick={handleLogout} variant="text">
                            {t('customer:button:logout')}
                        </Button>
                    </li>
                )}
            </ul>
        </div>
    );
};
