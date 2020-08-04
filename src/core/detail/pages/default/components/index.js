/* eslint-disable array-callback-return */
import Button from '@common_button';
import PriceFormat from '@common_priceformat';
import Banner from '@common_banner';
import Caraousel from '@common_slider/Carousel';
import Typography from '@common_typography';
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import ShareOutlined from '@material-ui/icons/ShareOutlined';
import classNames from 'classnames';
import React from 'react';
import HtmlParser from 'react-html-parser';
import { getHost } from '@helpers/config';
import Breadcrumb from '@common_breadcrumb';
import RatingStar from '@common_ratingstar';
import useStyles from './style';
import ExpandDetail from './ExpandDetail';
import ListReviews from './ListReviews';
import OptionItem from './OptionItem';
import RightDrawer from './RightDrawer';
import SharePopup from './SharePopup';

const ProductPage = (props) => {
    const styles = useStyles();
    const {
        t, data, openOption, handleOption,
        setOpenOption,
        setBanner,
        setPrice,
        openShare,
        setOpenShare,
        route,
        banner,
        openDrawer,
        setOpenDrawer,
        breadcrumbsData,
        price,
        handleWishlist,
        reviewValue,
        wishlist,
        expandData,
        relateData,
    } = props;
    console.log(props);
    const favoritIcon = wishlist ? (
        <Favorite className={styles.iconShare} />
    ) : (
        <FavoriteBorderOutlined className={styles.iconShare} />
    );

    return (
        <>
            <OptionItem
                {...props}
                open={openOption}
                setOpen={() => setOpenOption(!openOption)}
                setBanner={setBanner}
                setPrice={setPrice}
            />
            <SharePopup
                open={openShare}
                setOpen={() => setOpenShare(!openShare)}
                link={getHost() + route.asPath}
                {...props}
            />
            <div className={styles.container}>
                <div className={styles.headContainer}>
                    <Banner
                        data={banner}
                        autoPlay={false}
                        width={960}
                        height={1120}
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
                        <Breadcrumb data={breadcrumbsData} variant="text" />
                    </div>
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
                            <RatingStar value={reviewValue || 0} />
                            <Typography
                                variant="p"
                                type="regular"
                                letter="capitalize"
                            >
                                {data.review.reviews_count || 0}
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
                        onClick={handleOption}
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
            </div>
        </>
    );
};

export default ProductPage;
