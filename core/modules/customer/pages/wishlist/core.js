/* eslint-disable no-nested-ternary */
import { getCartId, setCartId } from '@helper_cartid';
import { debuging } from '@config';
import { useQuery } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getHost } from '@helper_config';
import Layout from '@layout';
import CustomerLayout from '@layout_customer';
import { getCartIdUser } from '@core_modules/customer/services/graphql/schema';
import {
    addSimpleProductsToCart, customerWishlist, getCustomer, removeWishlist as gqlremoveWishlist, shareWishlist,
} from '@core_modules/customer/services/graphql';
import { addWishlist } from '@core_modules/catalog/services/graphql';

const Wishlist = (props) => {
    let wishlist = [];
    const {
        Content, t, isLogin, pageConfig, Skeleton, isRedirectWishlist = false, storeConfig,
        ...other
    } = props;

    const [addToCart] = addSimpleProductsToCart();
    const [removeWishlist] = gqlremoveWishlist();
    const [getCustomerWishlist, { data: dataWishlist, refetch: wishlistRefetch }] = customerWishlist();
    const [postAddWishlist] = addWishlist();
    const [feed, setFeed] = React.useState(false);

    const cartUser = useQuery(getCartIdUser, {
        context: {
            request: 'internal',
        },
        skip: !isLogin || typeof window === 'undefined',
    });
    const {
        data, loading, error, refetch,
    } = getCustomer();
    if (data) {
        wishlist = data.customer.wishlist.items.map(({ id, product }) => ({
            ...product,
            wishlistItemId: id,
            name: product.name,
            link: product.url_key,
            imageSrc: product.small_image.url || '/assets/img/placeholder.png',
            price: product.price_range.minimum_price.regular_price.value,
        }));
    }

    let cartId = '';

    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }

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
                    Router.push('/wishlist');
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

    const handleToCart = ({
        sku, url_key, wishlistItemId, __typename,
    }) => {
        if (__typename === 'ConfigurableProduct') {
            Router.push('/[...slug]', `/${url_key}`);
        } else {
            window.backdropLoader(true);
            if (cartId === '' || !cartId) {
                const cartToken = cartUser.data ? cartUser.data.customerCart.id || '' : '';
                cartId = cartToken;
                setCartId(cartToken);
            }
            addToCart({
                variables: {
                    cartId,
                    sku,
                    qty: parseFloat(1),
                },
            })
                .then(() => {
                    removeWishlist({
                        variables: {
                            wishlistItemId,
                        },
                    }).then(() => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'success',
                            text: t('customer:wishlist:successAddCart'),
                        });
                        if (isRedirectWishlist) {
                            wishlistRefetch();
                        } else {
                            refetch();
                        }
                    });
                })
                .catch(async (e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('customer:wishlist:failedAddCart'),
                    });
                });
        }
    };

    const handleAddAlltoBag = async (items = []) => {
        window.backdropLoader(true);
        let totalSucces = 0;
        let errorCart = [false, ''];
        if (cartId === '' || !cartId) {
            const cartToken = cartUser.data.customerCart.id || '';
            cartId = cartToken;
            setCartId(cartToken);
        }
        if (isRedirectWishlist) {
            items.map(async (item) => {
                addToCart({
                    variables: {
                        cartId,
                        sku: item.sku,
                        qty: parseFloat(1),
                    },
                })
                    .then(async () => {
                        totalSucces += 1;
                        removeWishlist({
                            variables: {
                                wishlistItemId: item.wishlistItemId,
                            },
                        });
                    })
                    .catch((e) => {
                        errorCart = [true, e.message.split(':')[1]];
                    });
            });
        } else {
            await wishlist.map(async (item) => {
                addToCart({
                    variables: {
                        cartId,
                        sku: item.sku,
                        qty: parseFloat(1),
                    },
                })
                    .then(async () => {
                        totalSucces += 1;
                        removeWishlist({
                            variables: {
                                wishlistItemId: item.wishlistItemId,
                            },
                        });
                    })
                    .catch((e) => {
                        errorCart = [true, e.message.split(':')[1]];
                    });
            });
        }
        setTimeout(async () => {
            if (isRedirectWishlist) {
                wishlistRefetch();
            } else {
                refetch();
            }
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: errorCart[0]
                    ? totalSucces > 0
                        // eslint-disable-next-line max-len
                        ? `${t('customer:wishlist:addPartToBagSuccess').split('$'[0])} ${totalSucces} ${t('customer:wishlist:addPartToBagSuccess').split('$'[1])}`
                        : errorCart[1] || t('customer:wishlist:failedAddCart')
                    : t('customer:wishlist:addAllToBagSuccess'),
                variant: errorCart[0] ? 'error' : 'success',
            });
        }, 3000);
    };

    if (isRedirectWishlist) {
        const router = useRouter();
        const hashCode = router.query.code;
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

        const configShare = {
            title: storeConfig.default_title,
            header: false, // available values: "absolute", "relative", false (default)
            bottomNav: 'home',
            pageType: 'home',
            schemaOrg,
            ...pageConfig,
        };

        return (
            <Layout {...props} pageConfig={configShare} {...other}>
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
    }
    const config = {
        title: t('customer:wishlist:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:wishlist:pageTitle'),
        bottomNav: false,
    };
    const [setShareWishlist] = shareWishlist();

    const handleShareWishlist = async (emails, message) => {
        if (emails === '' || message === '') {
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t('customer:wishlist:validateField'),
            });
            return 2;
        }
        const emailsToArray = emails.split(',');
        try {
            const res = await setShareWishlist({
                variables: {
                    emails: emailsToArray,
                    message,
                },
            });
            if (res) {
                window.toastMessage({
                    open: true,
                    variant: 'success',
                    text: t('customer:wishlist:shareSuccess'),
                });
                return 1;
            }
        } catch (e) {
            window.toastMessage({
                open: true,
                variant: 'error',
                text: e.message.split(':')[1] || t('customer:wishlist:shareFailed'),
            });
            return -1;
        }

        return null;
    };

    const handleRemove = ({ wishlistItemId }) => {
        window.backdropLoader(true);
        removeWishlist({
            variables: {
                wishlistItemId,
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'success',
                    text: t('customer:wishlist:removeSuccess'),
                });
                refetch();
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: e.message.split(':')[1] || t('customer:wishlist:removeFailed'),
                });
            });
    };

    if (!data || loading || error) {
        return (
            <Layout pageConfig={pageConfig || config} {...props}>
                <CustomerLayout {...props}>
                    <Skeleton />
                </CustomerLayout>
            </Layout>
        );
    }

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content
                t={t}
                wishlist={wishlist}
                refetch={refetch}
                handleRemove={handleRemove}
                handleToCart={handleToCart}
                handleAddAlltoBag={handleAddAlltoBag}
                loading={loading}
                handleShareWishlist={handleShareWishlist}
            />
        </Layout>
    );
};

export default Wishlist;
