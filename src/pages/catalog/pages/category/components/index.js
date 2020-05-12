import Banner from '@components/Slider/Banner';
import CustomTabs from '@components/Tabs';
import { Box } from '@material-ui/core';
import React from 'react';
import Router from 'next/router';
import Product from '@components/ProductList';
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

    return (
        <Box className={styles.container}>
            {dataBanner.length > 0
                ? (
                    <div className={styles.headContainer}>
                        <Banner data={dataBanner} initial={{ url: 'img', link: 'link' }} height="40vh" />
                        {' '}
                    </div>
                ) : null}
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
                customFilter={customFilter.loading ? [] : customFilter.data.getFilterAttributeOptions.data}
                catId={categoryList.id}
                catalog_search_engine={storeConfig.catalog_search_engine}
                t={t}
            />
        </Box>
    );
};

export default CategoryPage;
