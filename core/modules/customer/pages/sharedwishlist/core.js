import Layout from '@layout';
import { useEffect } from 'react';
import { getHost } from '@helper_config';
import { debuging } from '@config';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { localTotalCart } from '@services/graphql/schema/local';
import { setCartId } from '@helper_cartid';
import {
    customerWishlist,
} from '@core_modules/customer/services/graphql';
import {
    addSimpleProductsToCart,
    getGuestCartId as queryGetGuestCartId,
    getCustomerCartId,
} from '@core_modules/product/services/graphql';
import { addWishlist } from '@core_modules/catalog/services/graphql';

const HomeCore = (props) => {
    const {
        Content, pageConfig, storeConfig, t, isLogin, ...other
    } = props;

    let cartId = '';
    const router = useRouter();
    const hashCode = router.query.code;
    const [getCustomerWishlist, { data: dataWishlist }] = customerWishlist();
    const [postAddWishlist] = addWishlist();
    const [getGuestCartId] = queryGetGuestCartId();
    const [addToCart] = addSimpleProductsToCart();
    const [feed, setFeed] = React.useState(false);
    const [getCartUser, { data: cartUser }] = getCustomerCartId();
    const client = useApolloClient();

    useEffect(() => {
        if (hashCode) {
            getCustomerWishlist(
                {
                    variables: {
                        sharing_code: hashCode,
                    },
                    skip: hashCode === '' || !hashCode,
                },
            );
        }
    }, [hashCode]);

    useEffect(() => {
        if (isLogin && !cartUser) {
            getCartUser();
        }
    }, [cartUser, isLogin]);

    const handleFeed = (id) => {
        if (isLogin && isLogin !== '') {
            postAddWishlist({
                variables: {
                    productId: id,
                },
            })
                .then(async () => {
                    await setFeed(!feed);
                    await window.toastMessage({ open: true, variant: 'success', text: t('common:message:feedSuccess') });
                    router.push('/wishlist');
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: debuging.originalError ? e.message.split(':')[1] : t('common:message:feedFailed'),
                    });
                });
        } else if (typeof window.toastMessage !== 'undefined') {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: t('catalog:wishlist:addWithoutLogin'),
            });
        }
    };

    const handleToCart = async ({ sku, url_key, __typename }) => {
        const errorMessage = {
            variant: 'error',
            text: t('product:failedAddCart'),
            open: true,
        };
        if (__typename === 'ConfigurableProduct') {
            router.push('/[...slug]', `/${url_key}`);
        } else {
            window.backdropLoader(true);
            if (!cartId || cartId === '' || cartId === undefined) {
                if (!isLogin) {
                    await getGuestCartId()
                        .then((res) => {
                            const token = res.data.createEmptyCart;
                            cartId = token;
                            setCartId(token);
                        })
                        .catch((e) => {
                            window.toastMessage({
                                ...errorMessage,
                                text: e.message.split(':')[1] || errorMessage.text,
                            });
                        });
                } else {
                    const token = cartUser ? cartUser.customerCart.id : '';
                    cartId = token;
                    setCartId(token);
                }
            }
            addToCart({
                variables: {
                    cartId,
                    sku,
                    qty: parseFloat(1),
                },
            })
                .then((res) => {
                    window.backdropLoader(false);
                    client.writeQuery({ query: localTotalCart, data: { totalCart: res.data.addSimpleProductsToCart.cart.total_quantity } });
                    window.toastMessage({
                        variant: 'success',
                        text: t('product:successAddCart'),
                        open: true,
                    });
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        ...errorMessage,
                        text: e.message.split(':')[1] || errorMessage.text,
                    });
                });
        }
    };

    const handleAddAlltoBag = async (items = []) => {
        window.backdropLoader(true);
        let totalSucces = 0;
        let errorCart = [false, ''];
        const errorMessage = {
            variant: 'error',
            text: t('product:failedAddCart'),
            open: true,
        };
        if (!cartId || cartId === '' || cartId === undefined) {
            if (!isLogin) {
                await getGuestCartId()
                    .then((res) => {
                        const token = res.data.createEmptyCart;
                        cartId = token;
                        setCartId(token);
                    })
                    .catch((e) => {
                        window.toastMessage({
                            ...errorMessage,
                            text: e.message.split(':')[1] || errorMessage.text,
                        });
                    });
            } else {
                const token = cartUser ? cartUser.customerCart.id : '';
                cartId = token;
                setCartId(token);
            }
        }
        items.map(async (item) => {
            addToCart({
                variables: {
                    cartId,
                    sku: item.sku,
                    qty: parseFloat(1),
                },
            })
                .then(async (res) => {
                    totalSucces += 1;
                    client.writeQuery({ query: localTotalCart, data: { totalCart: res.data.addSimpleProductsToCart.cart.total_quantity } });
                })
                .catch((e) => {
                    errorCart = [true, e.message.split(':')[1]];
                });
        });
        setTimeout(async () => {
            window.backdropLoader(false);
            /* eslint-disable */
            window.toastMessage({
                open: true,
                text: errorCart[0]
                    ? totalSucces > 0
                        ? `${t('customer:wishlist:addPartToBagSuccess').split('$'[0])} ${totalSucces} ${t('customer:wishlist:addPartToBagSuccess').split('$'[1])}`
                        : errorCart[1] || t('customer:wishlist:failedAddCart')
                    : t('customer:wishlist:addAllToBagSuccess'),
                variant: errorCart[0] ? 'error' : 'success',
            });
            /* eslint-enable */
        }, 3000);
    };

    const schemaOrg = [
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: `${getHost()}/`,
            logo: `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: `${getHost()}/`,
            potentialAction: [
                {
                    '@type': 'SearchAction',
                    target: `${getHost()}/catalogsearch/result?q={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                },
            ],
        },
    ];

    const config = {
        title: storeConfig.default_title,
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: 'home',
        pageType: 'home',
        schemaOrg,
        ...pageConfig,
    };

    return (
        <Layout {...props} pageConfig={config} {...other}>
            <Content
                storeConfig={storeConfig}
                {...other}
                wishlistItem={dataWishlist}
                t={t}
                handleToCart={handleToCart}
                handleFeed={handleFeed}
                handleAddAlltoBag={handleAddAlltoBag}
            />
        </Layout>
    );
};

export default HomeCore;
