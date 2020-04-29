import Button from '@components/Button';
import PriceFormat from '@components/PriceFormat';
import Banner from '@components/Slider/Banner';
import Caraousel from '@components/Slider/Carousel';
import Typography from '@components/Typography';
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
import useStyles from '../style';
import ExpandDetail from './ExpandDetail';
import ListReviews from './ListReviews';
import OptionDialog from './OptionDialog';
import RatingStar from './RatingStar';
import RightDrawer from './RightDrawer';
import SharePopup from './SharePopup';

const ProductPage = (props) => {
    const {
        t, url, data,
    } = props;
    const styles = useStyles();
    const route = useRouter();

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
    const [banner, setBanner] = React.useState(bannerData);
    const [price, setPrice] = React.useState({
        priceRange: data.price_range,
        priceTiers: data.price_tiers,
        // eslint-disable-next-line no-underscore-dangle
        productType: data.__typename,
    });
    const [feed, setFeed] = React.useState(false);

    const favoritIcon = feed ? (
        <Favorite className={styles.iconShare} />
    ) : (
        <FavoriteBorderOutlined className={styles.iconShare} />
    );

    const handleFeed = () => {
        setFeed(!feed);
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
        imageSrc: product.thumbnail.url,
        price: product.price_range.minimum_price.regular_price.value,
    }));
    return (
        <>
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
                        height="70vh"
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
                                onClick={handleFeed}
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
