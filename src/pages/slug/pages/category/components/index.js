import Banner from '@components/Slider/Banner';
import CustomTabs from '@Tabs';
import React from 'react';
import Router from 'next/router';
import Product from '@components/ProductList';
import Breadcrumb from '@Breadcrumb';
import { imageSize } from '@config';
import useStyles from '../style';
import { getFilter } from '../services';

const categoryTabs = (category) => {
    const data = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < category.length; index++) {
        data.push(category[index].name);
    }
    return data;
};

const CategoryPage = ({ data, storeConfig, t }) => {
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
            {dataBanner.length > 0
                ? (
                    <div className={styles.headContainer}>
                        <Banner
                            data={dataBanner}
                            width={imageSize.category.width}
                            height={imageSize.category.height}
                        />
                        {' '}
                    </div>
                ) : null}
            <div className={styles.breadcrumbs}>
                <Breadcrumb data={breadcrumbsData} />
            </div>
            {dataBanner[0] && dataBanner[0].description && (
                /* eslint-disable-next-line react/no-danger */
                <div className="cms-container" dangerouslySetInnerHTML={{ __html: dataBanner[0].description }} />
            )}
            <div>
                <CustomTabs
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
            />
        </div>
    );
};

export default CategoryPage;
