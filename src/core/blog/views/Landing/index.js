/* eslint-disable no-nested-ternary */
import Button from '@components/Button';
import Typography from '@components/Typography';
import React from 'react';
import propTypes from 'prop-types';

const Content = ({
    t, data, loadMore, loading, handleLoadMore, page, loadCategory,
    ContentCategory, ContentItem,
}) => (
    <div>
        <ContentCategory
            t={t}
            loadCategory={loadCategory}
        />
        {data
                && data.getBlogByFilter.items.length > 0
                && data.getBlogByFilter.items.map((blog, index) => <ContentItem key={index} short {...blog} />)}
        {data && data.getBlogByFilter.total_count > data.getBlogByFilter.items.length && data.getBlogByFilter.total_pages > page && (
            <Button variant="text" onClick={handleLoadMore} disabled={loading || loadMore} fullWidth>
                <Typography variant="span" type="regular" letter="capitalize">
                    {loadMore || loading ? 'Loading ...' : t('blog:loadMore')}
                </Typography>
            </Button>
        )}
    </div>
);

Content.prototype = {
    t: propTypes.func.isRequired,
    data: propTypes.array.isRequired,
    loadMore: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
    handleLoadMore: propTypes.func.isRequired,
    page: propTypes.number.isRequired,
    loadCategory: propTypes.any.isRequired,
    ContentItem: propTypes.func.isRequired,
    ContentCategory: propTypes.func.isRequired,
};

export default Content;
