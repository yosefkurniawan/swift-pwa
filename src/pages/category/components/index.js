import Button from "@components/Button";
import FilterDialog from "@components/FilterDialog";
import GridList from "@components/GridList";
import ProductItem from "@components/ProductItem";
import Banner from "@components/Slider/Banner";
import CustomTabs from "@components/Tabs";
import Typography from "@components/Typography";
import { Box } from "@material-ui/core";
import { Tune } from "@material-ui/icons";
import React from "react";
import useStyles from "../style";

const data = [
  {
    img: "/assets/img/sample/category-banner.png",
    link: "/",
  },
];

const product = [1, 2, 3, 4, 5, 6, 7, 8];

const category = ["DRESS", "TOP", "bottom", "accecories", "hijab"];

const radioData = [
  { value: "popularity", label: "Popularity" },
  { value: "new", label: "New Item" },
  { value: "priceHigh", label: "price (Hight to Low)" },
  { value: "priceLow", label: "Price (Low to Hight)" },
];

const brandData = [
  { value: "one", label: "Brand One" },
  { value: "two", label: "brand two" },
  { value: "three", label: "Brand three" },
  { value: "four", label: "brand four" },
];

const CategoryPage = () => {
  const styles = useStyles();
  const [value, setValue] = React.useState(0);
  const [openFilter, setOpenFilter] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <FilterDialog
        open={openFilter}
        setOpen={() => setOpenFilter(!openFilter)}
        itemProps={{
          selectBrandData: brandData,
          shortByData: radioData,
          selectSizeData: ["m", "l", "xl"],
          selectColorData: ["#ff0000", "#ababce"],
          priceRangeMaxValue: 1500000,
          priceRangeValue: [100000, 1000000],
        }}
        getValue={(v) => console.log(v)}
      />
      <Box className={styles.container}>
        <div className={styles.headContainer}>
          <Banner data={data} height="40vh" />
        </div>
        <div>
          <CustomTabs data={category} onChange={handleChange} value={value} />
        </div>
        <div className={styles.filterContainer}>
          <Typography
            variant="p"
            type="regular"
            className={styles.countProductText}
          >
            123 Product
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
            data={product}
            ItemComponent={ProductItem}
            itemProps={{
              color: ["#343434", "#6E6E6E", "#989898", "#C9C9C9"],
              showListColor: true,
              showListSize: true,
              size: ["s", "m", "l", "xl"],
            }}
            gridItemProps={{ xs: 6, sm: 4, md: 3 }}
          />
        </div>
      </Box>
    </>
  );
};

export default CategoryPage;
