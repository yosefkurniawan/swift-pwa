import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import propTypes from 'prop-types';
import DefaultLayout from '@layout';
import { useRouter } from 'next/router';
import { getCategory, getBlog } from '../services/graphql';
import * as Schema from '../services/graphql/schema';

const Category = (props) => {
    const {
        t, Loader, WarningInfo, Content, pageConfig, ...other
    } = props;
    const router = useRouter();
    const { id } = router.query;
    const config = {
        title: 'Blog',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: 'Blog',
        bottomNav: false,
        ...pageConfig,
    };
    const [page, setPage] = React.useState(1);
    const [pageSize] = React.useState(5);
    const [loadMore, setLoadMore] = React.useState(false);

    const { loading, data, error } = getCategory({
        url_key: id,
    });
    const loadCategory = getCategory({ category_id: 0 });
    const loadBlog = getBlog({
        skip: typeof window === 'undefined' || loading,
        variables: {
            page_size: pageSize,
            current_page: 1,
            category_id: data ? data.getBlogCategory.data[0].id : 0,
            id: 0,
        },
    });
    if (loading || !data || loadBlog.loading) {
        return <Loader />;
    }
    if (error) {
        return (
            <DefaultLayout pageConfig={config}>
                <WarningInfo variant="error" text={t('blog:error:fetch')} />
            </DefaultLayout>
        );
    }
    if (data && data.getBlogCategory.data.length > 0) {
        config.title = data.getBlogCategory.data[0].name;
        config.headerTitle = data.getBlogCategory.data[0].name;

        const handleLoadMore = () => {
            setPage(page + 1);
            setLoadMore(true);
            loadBlog.fetchMore({
                query: Schema.getAllPost,
                variables: {
                    current_page: page + 1,
                    page_size: pageSize,
                    category_id: data.getBlogCategory.data[0].id,
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

        const contentprops = {
            t, handleLoadMore, loadMore, page, pageSize, loading: loadBlog.loading, data: loadBlog.data, loadCategory,
        };

        return (
            <DefaultLayout {...props} pageConfig={config}>
                <Content
                    {...contentprops}
                    {...other}
                />
            </DefaultLayout>
        );
    } return (
        <DefaultLayout pageConfig={config}>
            <WarningInfo variant="error" text={t('blog:error:notFound')} />
        </DefaultLayout>
    );
};

Category.propTypes = {
    Content: propTypes.func.isRequired,
    ContentItem: propTypes.func.isRequired,
    ContentCategory: propTypes.func.isRequired,
    Loader: propTypes.func,
    WarningInfo: propTypes.func,
};

Category.defaultProps = {
    Loader: () => <p>loading</p>,
    WarningInfo: () => <p>Error</p>,
};

export default withApollo({ ssr: true })(withTranslation()(Category));
