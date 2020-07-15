/* eslint-disable no-nested-ternary */
import React from 'react';
import propTypes from 'prop-types';
import DefaultLayout from '@components/Layouts';
import { getBlog, getCategory } from '../services/graphql';
import * as Schema from '../services/graphql/schema';

const CoreLanding = (props) => {
    const {
        t, Loader, WarningInfo, Content, pageConfig = {}, ...other
    } = props;
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

    const {
        loading, data, error, fetchMore,
    } = getBlog({
        skip: typeof window === 'undefined',
        variables: {
            page_size: pageSize,
            current_page: 1,
            category_id: 0,
            id: 0,
        },
    });

    const loadCategory = getCategory({ category_id: 0 });
    if (loading || !data || loadCategory.loading) {
        return <Loader />;
    }
    if (error) {
        return (
            <DefaultLayout {...props} pageConfig={config}>
                <WarningInfo variant="error" text={t('blog:error:fetch')} />
            </DefaultLayout>
        );
    }

    if (!loading && data) {
        if (data.getBlogByFilter.items.length === 0) {
            return (
                <DefaultLayout {...props} pageConfig={config}>
                    <WarningInfo variant="error" text={t('blog:error:notFound')} />
                </DefaultLayout>
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
                category_id: 0,
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
        t, handleLoadMore, loadMore, page, pageSize, loading, data, loadCategory,
    };

    return (
        <DefaultLayout {...props} pageConfig={config}>
            <Content
                {...contentprops}
                {...other}
            />
        </DefaultLayout>
    );
};

CoreLanding.propTypes = {
    Content: propTypes.func.isRequired,
    ContentItem: propTypes.func.isRequired,
    ContentCategory: propTypes.func.isRequired,
    Loader: propTypes.func,
    WarningInfo: propTypes.func,
};

CoreLanding.defaultProps = {
    Loader: () => {},
    WarningInfo: () => {},
};

export default CoreLanding;
