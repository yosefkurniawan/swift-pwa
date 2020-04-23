import Banner from '@components/Slider/Banner';
import CustomTabs from '@components/Tabs';
import { Box } from '@material-ui/core';
import React from 'react';
import Router from 'next/router';
import useStyles from '../style';
import Product from './Product';

let dataBanner = [
    {
        img: '/assets/img/sample/category-banner.png',
        link: '/',
    },
];

const categoryTabs = (category) => {
    const data = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < category.length; index++) {
        data.push(category[index].name);
    }
    return data;
};

const CategoryPage = ({ data }) => {
    const styles = useStyles();
    const [value] = React.useState(0);
    const categoryList = data.categoryList[0];
    const handleChange = (event, newValue) => {
        Router.push(
            '/[...slug]',
            `/${categoryList.children[newValue - 1].url_path}`,
        );
    };

    if (categoryList.image) {
        dataBanner = [
            {
                img: categoryList.image,
                link: categoryList.url_path,
            },
        ];
    }

    return (
        <>
            <Box className={styles.container}>
                <div className={styles.headContainer}>
                    <div className={styles.header}>{categoryList.name}</div>
                    <Banner data={dataBanner} initial={{ url: 'img', link: 'link' }} height="40vh" />
                </div>
                <div>
                    <CustomTabs
                        data={categoryTabs(categoryList.children)}
                        onChange={handleChange}
                        value={value}
                    />
                </div>
                <Product catId={categoryList.id} />
            </Box>
        </>
    );
};

export default CategoryPage;
