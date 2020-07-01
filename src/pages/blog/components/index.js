/* eslint-disable no-nested-ternary */
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Button from '@components/Button';
import Typography from '@components/Typography';
import { getBlog } from '../services/graphql';
import * as Schema from '../services/graphql/schema';
import useStyles from '../style';
import ItemListBlog from './ItemListBlog';
import Loader from './LoaderList';

const Blog = ({ t }) => {
    const styles = useStyles();
    const [page, setPage] = React.useState(1);
    const [pageSize] = React.useState(5);
    const [category_id] = React.useState(0);
    const [loadMore, setLoadMore] = React.useState(false);

    const {
        loading, data, error, fetchMore,
    } = getBlog({
        page_size: pageSize,
        current_page: 1,
        category_id,
    });
    if (loading || !data) return <Loader />;
    if (error) {
        return (
            <div className={styles.container}>
                <Alert className="m-15" severity="error">
                    {error.message.split(':')[1]}
                </Alert>
            </div>
        );
    }

    if (!loading && data) {
        if (data.getBlogByFilter.items.length === 0) {
            return (
                <div className={styles.container}>
                    <Alert className="m-15" severity="error">
                        {t('common:error:notFound')}
                    </Alert>
                </div>
            );
        }
    }
    const handleLoadMore = () => {
        setPage(page + 1);
        setLoadMore(true);
        fetchMore({
            query: Schema.getAllPost,
            variables: {
                current_page: page + 1,
                page_size: pageSize,
                category_id,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                setLoadMore(false);
                const prevItems = previousResult.getBlogByFilter;
                const newItems = fetchMoreResult.getBlogByFilter;
                return {
                    getBlogByFilter: {
                        current_page: prevItems.current_page,
                        page_size: prevItems.page_size,
                        total_count: prevItems.total_count,
                        total_pages: prevItems.total_pages,
                        // eslint-disable-next-line no-underscore-dangle
                        __typename: prevItems.__typename,
                        items: [...prevItems.items, ...newItems.items],
                    },
                };
            },
        });
    };
    return (
        <div className={styles.container}>
            {data && data.getBlogByFilter.items.length > 0
                && data.getBlogByFilter.items.map((blog, index) => (
                    <ItemListBlog key={index} {...blog} />
                ))}
            {data && data.getBlogByFilter.total_count > data.getBlogByFilter.items.length
            && data.getBlogByFilter.total_pages > page && (
                <Button variant="text" onClick={handleLoadMore} disabled={loading || loadMore} fullWidth>
                    <Typography variant="span" type="regular" letter="capitalize">
                        {loadMore || loading ? 'Loading ...' : t('common:button:loadMore')}
                    </Typography>
                </Button>
            )}
        </div>
    );
};

export default Blog;
