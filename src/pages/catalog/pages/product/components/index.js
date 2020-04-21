import Button from '@components/Button';
import PriceFormat from '@components/PriceFormat';
import Banner from '@components/Slider/Banner';
import Caraousel from '@components/Slider/Carousel';
import Typography from '@components/Typography';
import { Box, IconButton } from '@material-ui/core';
import { Favorite, FavoriteBorderOutlined, ShareOutlined } from '@material-ui/icons';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import HtmlParser from 'react-html-parser';
import useStyles from '../style';
import AddReviewDialog from './AddReviewDialog';
import CustomerReview from './CustomerReview';
import ExpandDetail from './ExpandDetail';
import OptionDialog from './OptionDialog';
import RatingStar from './RatingStar';
import RightDrawer from './RightDrawer';
import SharePopup from './SharePopup';


const ProductPage = (props) => {
    const {
        t, url, data, storeConfig,
    } = props;
    const styles = useStyles();
    const route = useRouter();
    const [openOption, setOpenOption] = React.useState(false);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openShare, setOpenShare] = React.useState(false);
    const [feed, setFeed] = React.useState(false);
    const [openReview, setOpenReview] = React.useState(false);

    const favoritIcon = feed ? (
        <Favorite className={styles.iconShare} />
    ) : (
        <FavoriteBorderOutlined className={styles.iconShare} />
    );

    const handleFeed = () => {
        setFeed(!feed);
    };

    return (
        <>
            <OptionDialog
                {...props}
                open={openOption}
                setOpen={() => setOpenOption(!openOption)}
            />
            <SharePopup
                open={openShare}
                setOpen={() => setOpenShare(!openShare)}
                link={url + route.asPath}
                {...props}
            />
            <AddReviewDialog
                open={openReview}
                setOpen={() => setOpenReview(!openReview)}
                {...props}
            />
            <Box className={styles.container}>
                <div className={styles.headContainer}>
                    <Banner data={data.media_gallery} inital={{ url: 'url', link: '', alt: 'label' }} height="70vh" />
                    <RightDrawer
                        open={openDrawer}
                        setOpen={() => setOpenDrawer(!openDrawer)}
                    />
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
                                { data.name }
                            </Typography>
                            <PriceFormat
                                value={999000}
                                type="regular"
                                variant="span"
                                letter="uppercase"
                                className="clear-margin-padding"
                                storeConfig={storeConfig}
                            />
                        </div>
                        <div className={styles.shareContainer}>
                            <IconButton className={styles.btnShare} onClick={handleFeed}>
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
                        <div className={styles.ratingContainer}>
                            <RatingStar value={3} />
                            <Typography variant="p" type="regular" letter="capitalize">
                                5
                                {' '}
                                {t('product:review')}
                            </Typography>
                        </div>
                        <Typography variant="p" type="regular" letter="lowercase">
                            { data.color || 0 }
                            {' '}
                            {t('product:colorOption')}
                        </Typography>
                    </div>
                    <div className={styles.desc}>
                        <Typography variant="span" type="regular" size="10">
                            {HtmlParser(data.description.html)}
                        </Typography>
                    </div>
                    <div>
                        <ExpandDetail />
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.titleContainer}>
                        <div className={styles.titlePriceContainer}>
                            <Typography
                                variant="span"
                                type="bold"
                                letter="uppercase"
                                className={classNames('clear-margin-padding', styles.title)}
                            >
                                {t('product:customerReview')}
                            </Typography>
                            <Typography
                                type="regular"
                                variant="p"
                                letter="capitalize"
                                className="clear-margin-padding"
                            >
                                5
                                {' '}
                                {t('produc:review')}
                            </Typography>
                        </div>
                        <div className={styles.shareContainer}>
                            <Button onClick={() => setOpenReview(true)} variant="outlined">
                                {t('product:writeReview')}
                            </Button>
                        </div>
                    </div>
                    <div className={styles.reviewContainer}>
                        <CustomerReview />
                        <CustomerReview />
                        <div className={styles.btnLoadReview}>
                            <Button variant="text" disabled>
                                <Typography
                                    variant="span"
                                    type="regular"
                                    letter="capitalize"
                                    className={styles.textLoadReview}
                                >
                                    {t('product:moreReview')}
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={styles.carouselContainer}>
                    <Caraousel
                        data={data.related_products}
                        initial={{
                            name: 'name', price: '', url: 'url_key', thumbnail: 'thumbnail',
                        }}
                        title={t('product:recomendedTitle')}
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
