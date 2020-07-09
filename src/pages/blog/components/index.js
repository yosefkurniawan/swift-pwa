/* eslint-disable no-nested-ternary */
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Button from '@components/Button';
import Typography from '@components/Typography';
import Menu from '@material-ui/icons/Menu';
import { debuging } from '@config';
import { getBlog } from '../services/graphql';
import * as Schema from '../services/graphql/schema';
import useStyles from '../style';
import ItemListBlog from './DetailBlog';
import Loader from './LoaderList';
import ModalCategory from './ModalCategory';

const Blog = ({ t, category = {} }) => {
    const styles = useStyles();
    const [page, setPage] = React.useState(1);
    const [pageSize] = React.useState(5);
    const [loadMore, setLoadMore] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);

    const {
        loading, data, error, fetchMore,
    } = getBlog({
        page_size: pageSize,
        current_page: 1,
        category_id: category.id ? category.id : 0,
        id: 0,
    });
    if (loading || !data) return <Loader />;
    if (error) {
        return (
            <div className={styles.container}>
                <Alert className="m-15" severity="error">
                    {debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')}
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
                category_id: category.id ? category.id : 0,
                id: 0,
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
            <ModalCategory t={t} open={openModal} setOpen={() => setOpenModal(false)} />
            <div className={styles.btnCategoryContainer}>
                <Button
                    variant="text"
                    customRootStyle={{ width: 'fit-content' }}
                    className={styles.btnFilter}
                    onClick={() => setOpenModal(true)}
                >
                    <Menu className={styles.iconFilter} />
                </Button>
                <Typography type="bold" variant="span" letter="capitalize">
                    Categories
                </Typography>
            </div>
            {data && data.getBlogByFilter.items.length > 0
                && data.getBlogByFilter.items.map((blog, index) => (
                    <ItemListBlog key={index} {...blog} short />
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
