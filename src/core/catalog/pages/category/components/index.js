import React from 'react';
import Router from 'next/router';
import classNames from 'classnames';
import Product from '@core/catalog/plugin/ProductList';
import { features } from '@config';
import useStyles from './style';
import { getFilter } from '../../../services/graphql';

const categoryTabs = (category) => {
    const data = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < category.length; index++) {
        data.push(category[index].name);
    }
    return data;
};

const CategoryPage = ({
    data, storeConfig, t, BannerView, BreadcrumbView, TabView, ...other
}) => {
    const styles = useStyles();
    const [value] = React.useState(0);
    const categoryList = data.categoryList[0];
    let dataBanner = [];
    const handleChange = (event, newValue) => {
        Router.push(
            '/[...slug]',
            `/${categoryList.children[newValue - 1].url_path}`,
        );
    };
    if (categoryList.image_path) {
        dataBanner = [
            {
                imageUrl: categoryList.image_path,
                link: categoryList.url_path,
                description: categoryList.description,
            },
        ];
    }

    const customFilter = getFilter(categoryList.id);
    let breadcrumbsData = [];
    if (categoryList.breadcrumbs && categoryList.breadcrumbs.length > 0) {
        breadcrumbsData = categoryList.breadcrumbs.map((bc) => ({
            label: bc.category_name,
            link: `/${bc.category_url_path}`,
            active: false,
        }));
    }
    breadcrumbsData.push({
        label: categoryList.name,
        link: '#',
        active: true,
    });
    return (
        <div className={styles.container}>
            <div className={classNames(styles.breadcrumbs, 'hidden-mobile')}>
                <BreadcrumbView data={breadcrumbsData} />
            </div>
            {dataBanner.length > 0
                ? (
                    <div className={styles.headContainer}>
                        <BannerView
                            data={dataBanner}
                            width={features.imageSize.category.width}
                            height={features.imageSize.category.height}
                        />
                        {' '}
                    </div>
                ) : null}
            <div className={classNames(styles.breadcrumbs, 'hidden-desktop')}>
                <BreadcrumbView data={breadcrumbsData} />
            </div>
            {dataBanner[0] && dataBanner[0].description && (
                /* eslint-disable-next-line react/no-danger */
                <div className="cms-container" dangerouslySetInnerHTML={{ __html: dataBanner[0].description }} />
            )}
            <div className="hidden-desktop">
                <TabView
                    data={categoryTabs(categoryList.children)}
                    onChange={handleChange}
                    value={value}
                />
            </div>
            <Product
                defaultSort={{ key: 'position', value: 'ASC' }}
                customFilter={customFilter.loading ? [] : customFilter.data.getFilterAttributeOptions.data}
                catId={categoryList.id}
                categoryPath={categoryList.url_path}
                catalog_search_engine={storeConfig.catalog_search_engine}
                t={t}
                {...other}
            />
        </div>
    );
};

export default CategoryPage;
