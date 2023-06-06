/* eslint-disable react/no-danger */
import React from 'react';
import Router from 'next/router';
import classNames from 'classnames';
import Typography from '@common_typography';
import Product from '@plugin_productlist';
import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@root/core/helpers/env';
import useStyles from '@core_modules/catalog/pages/category/components/style';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';
import BreadcrumbView from '@common_breadcrumb';
import TabView from '@common_tabs';
import BannerView from '@common_image';
import { MAX_WIDTH } from '@theme_vars';

// sementara di comment dlu, untuk custom filter memakai aggregations product
// import { getFilter } from '../../../services/graphql';

const categoryTabs = (category) => {
    const data = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < category?.length; index++) {
        data.push(category[index].name);
    }
    return data;
};
const CategoryPage = ({
    data, storeConfig, t, ...other
}) => {
    const styles = useStyles();
    const [value] = React.useState(0);
    const categoryList = data?.categoryList[0];

    /** function to handle option category in filter */
    const handleCategory = (event, valueId) => {
        if (categoryList && categoryList.children) {
            // eslint-disable-next-line eqeqeq
            const category = categoryList.children.find((val) => val.id == valueId);
            return Router.push(
                '/[...slug]',
                `/${category.url_path}`,
            );
        } return null;
    };

    const urlDest = new URL(getStoreHost(getAppEnv()));
    const dataCategory = React.useMemo(() => {
        // sementara di comment dlu, untuk custom filter memakai aggregations product
        // const customFilter = getFilter(categoryList.id);
        let dataBanner = [];
        let urlString = '';
        let breadcrumbsData = [];

        if (categoryList) {
            dataBanner = [
                {
                    imageUrl: categoryList?.image_path,
                    link: categoryList?.url_path,
                    description: categoryList?.description,
                },
            ];
        }

        if (dataBanner?.length > 0) {
            const { imageUrl } = dataBanner[0];
            if (imageUrl !== '') {
                urlString = imageUrl.toLowerCase().indexOf(urlDest.hostname) === -1
                    ? `${urlDest.protocol}//${urlDest.hostname}${dataBanner[0]?.imageUrl}`
                    : dataBanner[0].imageUrl;
            }
        }

        if (categoryList?.breadcrumbs && categoryList?.breadcrumbs?.length > 0) {
            breadcrumbsData = categoryList?.breadcrumbs?.map((bc) => ({
                label: bc.category_name,
                link: `/${bc.category_url_path}`,
                active: false,
                id: bc.category_id,
            }));
        }
        breadcrumbsData.push({
            label: categoryList.name,
            link: '#',
            active: true,
        });

        return {
            // custom_filter: customFilter
            url: urlString,
            banner: dataBanner,
            breadcrumb: breadcrumbsData,
        };
    }, [categoryList]);

    const handleChange = React.useCallback((event, newValue) => {
        Router.push(
            '/[...slug]',
            `/${categoryList?.children[newValue - 1].url_path}`,
        );
    }, [categoryList]);

    return (
        <>
            <style jsx>
                {`
                    .cms-block-category :global(img) {
                        width: 100%;
                        max-width: 100%;
                    }
                `}
            </style>
            <div className={styles.container}>
                <div className={classNames(styles.breadcrumbs, 'hidden-mobile')}>
                    <BreadcrumbView data={dataCategory.breadcrumb} />
                </div>
                <div className={classNames(styles.breadcrumbs, 'hidden-desktop')}>
                    <BreadcrumbView data={dataCategory.breadcrumb} />
                </div>
                <Typography variant="h1" className={styles.categoryName}>
                    {categoryList.name}
                </Typography>
                <div className={styles.headContainer} style={{ width: '100%', height: 'auto' }}>
                    {dataCategory.banner.length > 0 && dataCategory.url !== ''
                        ? (
                            <BannerView
                                src={dataCategory.url}
                                style={{ width: '100%', height: 'auto' }}
                                lazy={false}
                                width={MAX_WIDTH.replace('px', '')}
                                storeConfig={storeConfig}
                            />
                        ) : null}
                </div>
                {dataCategory.banner.length > 0 && dataCategory.banner[0] && dataCategory.banner[0]?.description && (
                    <CmsRenderer content={dataCategory.banner[0].description} storeConfig={storeConfig} />
                )}
                <div className="hidden-desktop">
                    <TabView
                        data={categoryTabs(categoryList?.children)}
                        onChange={handleChange}
                        value={value}
                    />
                </div>
                {
                    categoryList
                    && (categoryList.display_mode === 'PRODUCTS_AND_PAGE' || categoryList.display_mode === 'PAGE')
                    && categoryList.cms_block
                    && (
                        <CmsRenderer content={categoryList.cms_block.content} storeConfig={storeConfig} />
                    )
                }
                {
                    categoryList
                    && (!categoryList.display_mode || categoryList.display_mode === 'PRODUCTS_AND_PAGE' || categoryList.display_mode === 'PRODUCTS')
                    && (
                        <Product
                            // sementara di comment dlu, untuk custom filter memakai aggregations product
                            // customFilter={customFilter.loading ? [] : customFilter.data.getFilterAttributeOptions.data}
                            catId={categoryList.id}
                            categoryPath={categoryList.url_path}
                            catalog_search_engine={storeConfig.catalog_search_engine}
                            t={t}
                            category={categoryTabs(categoryList?.children ?? [])}
                            dataTabs={categoryTabs(categoryList?.children ?? [])}
                            onChangeTabs={handleChange}
                            onChangeCategory={handleCategory}
                            storeConfig={storeConfig}
                            defaultSort={{ key: 'position', value: 'ASC' }}
                            {...other}
                        />
                    )
                }
            </div>
        </>
    );
};

export default CategoryPage;
