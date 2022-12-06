/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import Link from 'next/link';
import noReload from '@helper_noreload';
import { setResolver, getResolver } from '@helper_localstorage';
import Carousel from '@common_slick/Caraousel';
import { removeIsLoginFlagging } from '@helper_auth';
import { removeCookies } from '@helper_cookies';
import { removeCartId } from '@helper_cartid';
import Router, { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import ProductItem from '@plugin_productitem';
import { localTotalCart, localCompare } from '@services/graphql/schema/local';
import Typography from '@common_typography';
import PointCard from '@plugin_rewardpointinfo';
import Badge from '@material-ui/core/Badge';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import Button from '@common_button';
import Cookies from 'js-cookie';
import { custDataNameCookie } from '@config';
import useStyles from '@core_modules/customer/pages/account/components/Customer/style';
import { removeToken as deleteToken } from '@core_modules/customer/services/graphql';
import ProductCompareLabel from '@core_modules/catalog/plugins/ProductCompare';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@common_footer'), { ssr: false });
// eslint-disable-next-line consistent-return
const ViewMobile = (props) => {
    const {
        userData, t, menu, totalUnread, wishlist, modules, storeConfig,
    } = props;
    const router = useRouter();
    const linkAction = async (type, link) => {
        if (type === 'cms') {
            const urlResolver = getResolver();
            urlResolver[link] = {
                type: 'CMS_PAGE',
            };
            await setResolver(urlResolver);
            router.push('/[...slug]', link);
        } else {
            router.push('/[...slug]', link);
        }
    };
    const client = useApolloClient();
    const [deleteTokenGql] = deleteToken();
    const adminId = Cookies.get('admin_id');
    const handleLogout = () => {
        deleteTokenGql()
            .then(() => {
                Cookies.remove(custDataNameCookie);
                Cookies.remove('admin_id');
                removeIsLoginFlagging();
                removeCartId();
                removeCookies('uid_product_compare');
                client.writeQuery({ query: localTotalCart, data: { totalCart: 0 } });
                client.writeQuery({ query: localCompare, data: { item_count: 0 } });
                Router.push('/customer/account/login');
            })
            .catch(() => {
                //
            });
    };
    const styles = useStyles();
    const StyledBadge = withStyles(() => ({
        badge: {
            right: -4,
            top: 4,
        },
    }))(Badge);
    const footerMobile = {
        display: storeConfig.pwa && storeConfig.pwa.mobile_navigation === 'bottom_navigation' ? 'flex' : null,
    };
    React.useEffect(() => {
        noReload({
            action: linkAction,
        });
    }, [router.asPath]);

    return (
        <div className={classNames(styles.root, 'hidden-desktop')}>
            <div className={styles.account_wrapper}>
                <div className={[styles.account_block, styles.padding_vertical_40, styles.border_bottom].join(' ')}>
                    <h3 className={styles.account_username}>
                        {userData && userData.customer && `${userData.customer.firstname} ${userData.customer.lastname}`}
                    </h3>
                    <p className={styles.account_email}>{userData && userData.customer && userData.customer.email}</p>
                    {userData && userData.customer && adminId !== undefined && adminId !== ''
                        ? <p className={styles.account_email}>{`(Login By ${JSON.parse(adminId)[1]})`}</p>
                        : null}
                </div>
                <div className={[styles.account_block, styles.padding_vertical_40].join(' ')}>
                    {modules.rewardpoint.enabled ? <PointCard {...props} /> : null}
                    <div className={styles.account_block}>
                        <ul className={styles.account_navigation}>
                            {menu.map(({ href, title }, index) => (
                                <li className={styles.account_navigation_item} key={index}>
                                    <Link href={href}>
                                        <a className={styles.account_navigation_link}>
                                            <StyledBadge
                                                color="secondary"
                                                max={99}
                                                invisible={!href.includes('notification') || !totalUnread}
                                                badgeContent={totalUnread}
                                            >
                                                {title}
                                            </StyledBadge>
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {wishlist && wishlist.length > 0 ? (
                    <div className={[styles.account_block, styles.wishlistBlock].join(' ')}>
                        <div className={styles.account_clearfix}>
                            <div className={styles.spanWishlist}>
                                <Typography variant="span" type="bold" letter="capitalize" className={styles.account_wishlist_title}>
                                    Wishlist
                                </Typography>
                                <Link href="/wishlist">
                                    <a className={[styles.account_wishlist_read_more].join(' ')}>
                                        <Typography variant="span" type="bold" letter="capitalize">
                                            {t('customer:menu:readMore')}
                                        </Typography>
                                    </a>
                                </Link>
                            </div>
                        </div>
                        {modules.wishlist.enabled ? (
                            <div className={styles.account_clearfix}>
                                <Carousel data={wishlist} className={[styles.wishlistBlock, styles.margin20].join(' ')} Item={ProductItem} storeConfig={storeConfig} />
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <span className={styles.span} />
                )}
                <ul className={styles.account_navigation}>
                    {modules.productcompare.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <Button fullWidth variant="outlined" href="/catalog/product_compare">
                                <ProductCompareLabel withLink={false} />
                            </Button>
                        </li>
                    ) : null}

                    {modules.setting.enabled ? (
                        <li className={styles.account_navigation_item}>
                            <Button fullWidth variant="outlined" href="/setting">
                                <Typography variant="span" type="bold" letter="uppercase">
                                    {t('common:setting:title')}
                                </Typography>
                            </Button>
                        </li>
                    ) : null}

                    <li className={styles.account_navigation_item}>
                        <Button fullWidth className={styles.logoutBtn} onClick={handleLogout} variant="contained">
                            <Typography className={styles.logOutTxt} color="white" variant="span" type="bold" letter="uppercase">
                                {t('customer:button:logout')}
                            </Typography>
                        </Button>
                    </li>
                </ul>
                {storeConfig?.pwa?.enabler_footer_mobile === false ? (
                    <div className="hidden-desktop" style={{ ...footerMobile }}>
                        <Footer storeConfig={storeConfig} t={t} />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ViewMobile;
