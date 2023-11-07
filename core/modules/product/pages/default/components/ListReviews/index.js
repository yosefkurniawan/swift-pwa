/* eslint-disable array-callback-return */
/* eslint-disable react/destructuring-assignment */
import Button from '@common_button';
import Typography from '@common_typography';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '@core_modules/product/services/graphql';
import * as Schema from '@core_modules/product/services/graphql/schema';
import useStyles from '@core_modules/product/pages/default/components/style';
import AddReviewDialog from '@core_modules/product/pages/default/components/AddReviewDialog';
import AddReviewDialogView from '@core_modules/product/pages/default/components/AddReviewDialog/view';

const CustomerReview = dynamic(() => import('@core_modules/product/pages/default/components/CustomerReview'), { ssr: false });

const ListReviews = (props) => {
    const { storeConfig, isLogin } = props;
    const styles = useStyles();
    // sementara di comment dulu sudah confirm ke mas @rifki kalau tidak dipakai. dan jika tidak masalah bakal di hapus
    // const dispatch = useDispatch();
    // const productState = useSelector((state) => state.product);

    const [openReview, setOpenReview] = React.useState(false);
    const [loadMore, setLoadMore] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [reviewParams] = React.useState({
        sku: props.data.sku || '',
        pageSize: 2,
    });
    const guest_review = storeConfig?.allow_guests_to_write_product_reviews;

    const { loading, fetchMore, data } = getReviews(reviewParams);
    const handleOpenReview = ({ message, variant }) => {
        setOpenReview(!openReview);
        // eslint-disable-next-line no-unused-expressions
        message
            && message !== ''
            && window.toastMessage({
                open: true,
                text: message || props.t('product:addRateSuccess'),
                variant,
            });
    };

    const handleLoad = () => {
        setLoadMore(true);
        setPage(page + 1);
        return fetchMore({
            query: Schema.getReview(),
            fetchPolicy: 'cache-and-network',
            variables: {
                sku: reviewParams.sku,
                currentPage: page + 1,
                pageSize: reviewParams.pageSize,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                setLoadMore(false);
                const prevItems = previousResult.getProductReviews;
                const newItems = fetchMoreResult.getProductReviews;
                return {
                    getProductReviews: {
                        // eslint-disable-next-line no-underscore-dangle
                        __typename: newItems.__typename,
                        totalCount: newItems.totalCount,
                        message: prevItems.message,
                        items: [...prevItems.items, ...newItems.items],
                    },
                };
            },
        });
    };

    let review = {};

    review = data && data.getProductReviews
        ? data.getProductReviews
        : {
            items: [],
            totalCount: 0,
        };

    // eslint-disable-next-line no-unused-vars
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, [loading]);

    return (
        <>
            <AddReviewDialog
                {...props}
                open={openReview}
                setOpen={handleOpenReview}
                ViewDialog={AddReviewDialogView}
            />
            <div className={styles.shareRootContainer}>
                <div className={styles.titleContainer}>
                    <div className={styles.titlePriceContainer}>
                        <Typography variant="span" type="bold" letter="uppercase" className={classNames('clear-margin-padding', styles.title)}>
                            {props.t('product:customerReview')}
                        </Typography>
                        <Typography type="regular" variant="p" letter="capitalize" className="clear-margin-padding">
                            {(review && review.totalCount) || 0}
                            {' '}
                            {props.t('product:review')}
                        </Typography>
                    </div>
                    <div className={styles.shareContainer}>
                        {
                            (isLogin === 1 || guest_review === '1') && (
                                <Button onClick={() => setOpenReview(true)}>
                                    <Typography variant="span" type="bold" letter="uppercase">
                                        {props.t('product:writeReview')}
                                    </Typography>
                                </Button>
                            )
                        }
                    </div>
                </div>
                <div className={styles.reviewContainer}>
                    {review && review.items.map((item, index) => <CustomerReview key={index} {...item} />)}
                    <div className={styles.btnLoadReview}>
                        {review && review.totalCount > review.items.length && (
                            <Button variant="text" onClick={handleLoad} disabled={loading || loadMore}>
                                {/* <Typography variant="span" type="bold" letter="capitalize" suppressHydrationWarning>
                                    {loadMore || loading ? 'Loading ...' : props.t('product:moreReview')}
                                </Typography> */}
                                {loadMore || loading ? (
                                    <Typography variant="span" type="bold" letter="capitalize" suppressHydrationWarning>
                                        Loading...
                                    </Typography>
                                ) : (
                                    <Typography variant="span" type="bold" letter="capitalize" suppressHydrationWarning>
                                        {props.t('product:moreReview')}
                                    </Typography>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListReviews;
