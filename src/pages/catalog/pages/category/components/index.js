import Button from '@components/Button';
import FilterDialog from '@components/FilterDialog';
import GridList from '@components/GridList';
import ProductItem from '@components/ProductItem';
import Banner from '@components/Slider/Banner';
import CustomTabs from '@components/Tabs';
import Typography from '@components/Typography';
import { Box } from '@material-ui/core';
import { Tune } from '@material-ui/icons';
import React from 'react';
import useStyles from '../style';
import { getCategory } from '../services';

const dataBanner = [
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

const productData = (category, tabs) => {
    const data = {
        total_count: 0,
        items: [],
    };
    if (tabs === 0) {
        // handle if total count on level 1 null, so get from children
        if (category.products.total_count === 0) {
            // eslint-disable-next-line no-plusplus
            for (let index = 0; index < category.children.length; index++) {
                data.total_count += category.children[index].products.total_count;
                data.items = data.items.concat(category.children[index].products.items);
            }
        } else {
            data.total_count = category.products.total_count;
            data.items = category.products.items;
        }
    } else {
        data.total_count = category.children[tabs - 1].products.total_count;
        data.items = category.children[tabs - 1].products.items;
    }
    return data;
};

const radioData = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'new', label: 'New Item' },
    { value: 'priceHigh', label: 'price (Hight to Low)' },
    { value: 'priceLow', label: 'Price (Low to Hight)' },
];

const brandData = [
    { value: 'one', label: 'Brand One' },
    { value: 'two', label: 'brand two' },
    { value: 'three', label: 'Brand three' },
    { value: 'four', label: 'brand four' },
];

const CategoryPage = ({ categoryId }) => {
    const styles = useStyles();
    const [value, setValue] = React.useState(0);
    const [openFilter, setOpenFilter] = React.useState(false);
    const [priceRange, setPriceRange] = React.useState([450000, 999000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { loading, data } = getCategory({
        productSize: 20,
        id: categoryId,
    });

    if (loading) {
        return <div>loading</div>;
    }

    const categoryList = data.categoryList[0];

    const product = productData(categoryList, value);

    return (
        <>
            <FilterDialog
                open={openFilter}
                setOpen={() => setOpenFilter(!openFilter)}
                itemProps={{
                    selectBrandData: brandData,
                    shortByData: radioData,
                    selectSizeData: ['m', 'l', 'xl'],
                    selectColorData: ['#ff0000', '#ababce'],
                    priceRangeMaxValue: 1500000,
                    priceRangeValue: priceRange,
                    priceRangeChange: setPriceRange,
                }}
                getValue={(v) => console.log(v)}
            />
            <Box className={styles.container}>
                <div className={styles.headContainer}>
                    <Banner data={dataBanner} height="40vh" />
                </div>
                <div>
                    <CustomTabs data={categoryTabs(categoryList.children)} onChange={handleChange} value={value} />
                </div>
                <div className={styles.filterContainer}>
                    <Typography
                        variant="p"
                        type="regular"
                        className={styles.countProductText}
                    >
                        {product.total_count}
                        {' '}
                        Product
                    </Typography>
                    <div className={styles.filterBtnContainer}>
                        <Button
                            variant="text"
                            className={styles.btnFilter}
                            onClick={() => setOpenFilter(true)}
                        >
                            <Tune className={styles.iconFilter} />
                        </Button>
                        <Typography type="bold" variant="span" letter="capitalize">
                            Filter & Short
                        </Typography>
                    </div>
                </div>
                <div className={styles.productContainer}>
                    <GridList
                        data={product.items}
                        ItemComponent={ProductItem}
                        itemProps={{
                            color: ['#343434', '#6E6E6E', '#989898', '#C9C9C9'],
                            showListColor: true,
                            showListSize: true,
                            size: ['s', 'm', 'l', 'xl'],
                        }}
                        gridItemProps={{ xs: 6, sm: 4, md: 3 }}
                    />
                </div>
            </Box>
        </>
    );
};

export default CategoryPage;
