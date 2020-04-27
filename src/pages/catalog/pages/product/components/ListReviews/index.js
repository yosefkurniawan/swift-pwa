import Button from '@components/Button';
import Typography from '@components/Typography';
import classNames from 'classnames';
import React from 'react';
import SnackMessage from '@components/SnackMessage';
import { getReviews } from '../../services/graphql';
import useStyles from '../../style';
import AddReviewDialog from '../AddReviewDialog';
import CustomerReview from '../CustomerReview';

export default (props) => {
    const styles = useStyles();
    const { t, data } = props;
    const [openReview, setOpenReview] = React.useState(false);
    const [showMessage, setShowMessage] = React.useState(false);
    const [reviewParams, setReviewsParams] = React.useState({
        sku: data.sku || '',
        pageSize: 2,
        currentPage: 1,
    });

    const graphData = getReviews(reviewParams);

    const [prevReview, setPrevReview] = React.useState([]);

    const handleLoad = () => {
        setPrevReview([...prevReview, ...graphData.data.getProductReviews.items]);
        setReviewsParams({
            sku: data.sku || '',
            pageSize: 2,
            currentPage: reviewParams.currentPage + 1,
        });
    };

    const handleOpenReview = ({ message }) => {
        setOpenReview(!openReview);
        if (message && (message === 'success' || message.toLowerCase() === 'success')) setShowMessage(true);
    };

    return (
        <>
            <AddReviewDialog
                open={openReview}
                setOpen={handleOpenReview}
                {...props}
            />
            <SnackMessage open={showMessage} setOpen={setShowMessage} message={t('product:addRateSuccess')} />
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
                            {(graphData.data && graphData.data.getProductReviews.totalCount) || 0}
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
                    {
                        prevReview.length > 0
                            && prevReview.map((item, index) => (<CustomerReview key={index} {...item} />))
                    }
                    {
                        graphData.data && graphData.data.getProductReviews.items.map((item, index) => (<CustomerReview key={index} {...item} />))
                    }
                    <div className={styles.btnLoadReview}>
                        <Button
                            variant="text"
                            onClick={handleLoad}
                            disabled={
                                graphData.data
                                    ? (prevReview.length + graphData.data.getProductReviews.items.length)
                                    === graphData.data.getProductReviews.totalCount
                                    : true
                            }
                        >
                            <Typography
                                variant="span"
                                type="regular"
                                letter="capitalize"
                                className={
                                    graphData.data
                                    && (prevReview.length + graphData.data.getProductReviews.items.length)
                                    === graphData.data.getProductReviews.totalCount
                                        && styles.textLoadReview
                                }
                            >
                                {t('product:moreReview')}
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
