/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import React from 'react';
import propTypes from 'prop-types';
import DefaultLayout from '@layout';
import { useRouter } from 'next/router';
import { getBlog, getCategory } from '../services/graphql';

const CoreDetail = (props) => {
    const router = useRouter();
    const { id } = router.query;
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

    const {
        loading, data, error,
    } = getBlog({
        skip: typeof window === 'undefined',
        variables: {
            page_size: 1,
            current_page: 1,
            category_id: 0,
            url_key: id,
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

        config.title = data.getBlogByFilter.items[0].title;
        config.headerTitle = data.getBlogByFilter.items[0].title;

        return (
            <DefaultLayout {...props} pageConfig={config}>
                <Content
                    short={false}
                    t={t}
                    {...data.getBlogByFilter.items[0]}
                    {...other}
                />
            </DefaultLayout>
        );
    }
};

CoreDetail.propTypes = {
    Content: propTypes.func.isRequired,
    Loader: propTypes.func,
    WarningInfo: propTypes.func,
};

CoreDetail.defaultProps = {
    Loader: () => {},
    WarningInfo: () => {},
};

export default CoreDetail;
