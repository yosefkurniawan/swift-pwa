/* eslint-disable array-callback-return */
import Button from '@components/Button';
import PriceFormat from '@components/PriceFormat';
import Banner from '@components/Slider/Banner';
import Caraousel from '@components/Slider/Carousel';
import Typography from '@components/Typography';
import Toast from '@components/Toast';
import { Box, IconButton } from '@material-ui/core';
import {
    Favorite,
    FavoriteBorderOutlined,
    ShareOutlined,
} from '@material-ui/icons';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import HtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
import { GraphCustomer } from '@services/graphql';
import TagManager from 'react-gtm-module';
import useStyles from '../style';
import ExpandDetail from './ExpandDetail';
import ListReviews from './ListReviews';
import OptionDialog from './OptionDialog';
import RatingStar from './RatingStar';
import RightDrawer from './RightDrawer';
import SharePopup from './SharePopup';

const ProductPage = (props) => {
    const {
        t, url, data, token,
    } = props;
    const styles = useStyles();
    const route = useRouter();

    React.useEffect(() => {
        let index = 0;
        let categoryProduct = '';
        // eslint-disable-next-line no-unused-expressions
        data.categories.length > 0 && data.categories.map(({ name }, indx) => {
            if (indx > 0) categoryProduct += `/${name}`;
            else categoryProduct += name;
        });
        const tagManagerArgs = {
            dataLayer: {
                event: 'gtm.load',
                eventCategory: 'Ecommerce',
                eventAction: 'Impression',
                eventLabel: 'product Push It Messenger bag',
                ecommerce: {
                    detail: {
                        product: [{
                            name: data.name,
                            id: data.sku,
                            price: data.price_range.minimum_price.regular_price.value || 0,
                            category: categoryProduct,
                            dimensions4: data.stock_status,
                        }],
                    },
                    currencyCode: data.price_range.minimum_price.regular_price.currency || 'USD',
                    impressions: [
                        ...data.related_products.map((product) => {
                            index += 1;
                            return ({
                                name: product.name,
                                id: product.sku,
                                category: categoryProduct,
                                price: product.price_range.minimum_price.regular_price.value,
                                list: `Related Products From ${data.name}`,
                                position: index,
                            });
                        }),
                        ...data.upsell_products.map((product) => {
                            index += 1;
                            return ({
                                name: product.name,
                                id: product.sku,
                                category: categoryProduct,
                                price: product.price_range.minimum_price.regular_price.value,
                                list: `Related Products From ${data.name}`,
                                position: index,
                            });
                        }),
                    ],
                },
            },
        };
        TagManager.dataLayer(tagManagerArgs);
    }, []);

    const bannerData = [];
    if (data.media_gallery.length > 0) {
        // eslint-disable-next-line array-callback-return
        data.media_gallery.map((media) => {
            bannerData.push({
                link: '#',
                imageUrl: media.url,
            });
        });
    } else {
        bannerData.push({
            link: '#',
            imageUrl: data.image.url,
        });
    }

    const productState = useSelector((state) => state.product);
    const [openOption, setOpenOption] = React.useState(false);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openShare, setOpenShare] = React.useState(false);
    const [message, setMessage] = React.useState({
        open: false, text: '', variant: 'success',
    });
    const [banner, setBanner] = React.useState(bannerData);
    const [price, setPrice] = React.useState({
        priceRange: data.price_range,
        priceTiers: data.price_tiers,
        // eslint-disable-next-line no-underscore-dangle
        productType: data.__typename,
    });
    const [wishlist, setWishlist] = React.useState(false);

    const favoritIcon = wishlist ? (
        <Favorite className={styles.iconShare} />
    ) : (
        <FavoriteBorderOutlined className={styles.iconShare} />
    );

    const [addWishlist] = GraphCustomer.addWishlist(token);

    const handleWishlist = () => {
        if (token && token !== '') {
            TagManager.dataLayer({
                dataLayer: {
                    event: 'addToWishlist',
                    eventLabel: data.name,
                    label: data.name,
                    ecommerce: {
                        currencyCode: data.price_range.minimum_price.regular_price.currency || 'USD',
                        add: {
                            products: [{
                                name: data.name,
                                id: data.sku,
                                price: data.price_range.minimum_price.regular_price.value || 0,
                                category: data.categories.length > 0 ? data.categories[0].name : '',
                                list: data.categories.length > 0 ? data.categories[0].name : '',
                                dimensions4: data.stock_status,
                            }],
                        },
                    },
                },
            });
            addWishlist({
                variables: {
                    productId: data.id,
                },
            }).then(async () => {
                await setWishlist(!wishlist);
                await setMessage({ open: true, variant: 'success', text: t('wishlist:addSuccess') });
                route.push('/wishlist');
            }).catch((e) => {
                setMessage({
                    open: true,
                    variant: 'error',
                    text: e.message.split(':')[1] || t('wishlist:addFailed'),
                });
            });
        }
    };

    let expandData = [];
    if (data.description.html) {
        expandData = [
            ...expandData,
            {
                title: 'Detail',
                type: 'html',
                content: data.description.html,
            },
        ];
    }
    if (data.more_info) {
        expandData = [
            ...expandData,
            {
                title: 'More Info',
                type: 'array',
                content: data.more_info,
            },
        ];
    }
    const relateData = data.related_products.map((product) => ({
        ...product,
        name: product.name,
        link: product.url_key,
        imageSrc: product.small_image.url,
        price: product.price_range.minimum_price.regular_price.value,
    }));
    return (
        <>
            <Toast
                open={message.open}
                setOpen={() => setMessage({ ...message, open: false })}
                message={message.text}
                variant={message.variant}
            />
            <OptionDialog
                {...props}
                open={openOption}
                setOpen={() => setOpenOption(!openOption)}
                setBanner={setBanner}
                setPrice={setPrice}
            />
            <SharePopup
                open={openShare}
                setOpen={() => setOpenShare(!openShare)}
                link={url + route.asPath}
                {...props}
            />
            <Box className={styles.container}>
                <div className={styles.headContainer}>
                    <Banner
                        data={banner}
                        autoPlay={false}
                    />
                    {
                        data && data.upsell_products && data.upsell_products.length > 0 && (
                            <RightDrawer
                                open={openDrawer}
                                setOpen={() => setOpenDrawer(!openDrawer)}
                                {...props}
                            />
                        )
                    }
                </div>
                <div className={styles.body}>
                    <div className={styles.titleContainer}>
                        <div className={styles.titlePriceContainer}>
                            <Typography
                                variant="title"
                                type="bold"
                                letter="capitalize"
                                className="clear-margin-padding"
                            >
                                {data.name}
                            </Typography>
                            <PriceFormat
                                {...price}
                            />
                        </div>
                        <div className={styles.shareContainer}>
                            <IconButton
                                className={styles.btnShare}
                                onClick={handleWishlist}
                            >
                                {favoritIcon}
                            </IconButton>
                            <IconButton
                                className={styles.btnShare}
                                onClick={() => setOpenShare(true)}
                            >
                                <ShareOutlined className={styles.iconShare} />
                            </IconButton>
                        </div>
                    </div>
                    <div className={styles.titleContainer}>
                        <div className={classNames('row', styles.sku)}>
                            <Typography
                                className="clear-margin-padding"
                                variant="p"
                                type="regular"
                                letter="capitalize"
                            >
                                SKU#:
                                {' '}
                            </Typography>
                            <Typography
                                variant="p"
                                type="bold"
                                letter="none"
                            >
                                {data.sku || ''}
                            </Typography>
                        </div>
                        <Typography variant="p" type="bold" letter="uppercase">
                            {data.stock_status.replace('_', ' ') || ''}
                        </Typography>
                    </div>
                    <div className={styles.titleContainer}>
                        <div className={styles.ratingContainer}>
                            <RatingStar value={productState.review.rating || 0} />
                            <Typography
                                variant="p"
                                type="regular"
                                letter="capitalize"
                            >
                                {productState.review.totalCount || 0}
                                {' '}
                                {t('product:review')}
                            </Typography>
                        </div>
                    </div>
                    <div className={styles.desc}>
                        <Typography variant="span" type="regular" size="10">
                            {data.short_description.html
                                && HtmlParser(data.short_description.html)}
                        </Typography>
                    </div>
                    <div>
                        <ExpandDetail data={expandData} />
                    </div>
                </div>
                <ListReviews {...props} />
                <div className={styles.carouselContainer}>
                    <Caraousel
                        data={relateData}
                    />
                </div>
                <div className={styles.footer}>
                    <Button
                        className={styles.btnAddToCard}
                        color="primary"
                        onClick={() => setOpenOption(true)}
                        disabled={data && data.stock_status === 'OUT_STOCK'}
                    >
                        <Typography
                            align="center"
                            type="regular"
                            letter="capitalize"
                            className={styles.textBtnAddToCard}
                        >
                            {t('product:addToCart')}
                        </Typography>
                    </Button>
                </div>
            </Box>
        </>
    );
};

export default ProductPage;
