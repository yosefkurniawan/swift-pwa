import { AppBar, Box } from "@material-ui/core";
import { Tune } from "@material-ui/icons";
import React from "react";
import Button from "../../../commons/Button";
import Header from "../../../commons/Header";
import Typography from "../../../commons/Typography";
import useStyles from "../style";
import ProductList from "./ProductList";
import { Tab, Tabs } from "./Tabs";
import FilterDialog from "./FilterDialog";

const data = [
  {
    img:
      "https://www.creohouse.co.id/wp-content/uploads/2016/09/jasa-desain-banner-web-creohouse.jpg",
    link: "/"
  },
  {
    img: "assets/img/noun_Image.svg",
    link: "/"
  }
];

const product = [1, 2, 3, 4, 5, 6, 7, 8];

const category = ["DRESS", "TOP", "bottom", "accecories", "hijab"];

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`
  };
}

const Component = () => {
  const styles = useStyles();
  const [value, setValue] = React.useState(0);
  const [openFilter, setOpenFilter] = React.useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <FilterDialog
        open={openFilter}
        setOpen={() => setOpenFilter(!openFilter)}
      />
      <Box className={styles.container}>
        <div className={styles.headContainer}>
          <Header className={styles.header} />
          {/* <Banner data={data} /> */}
        </div>
        <div>
          <AppBar position="static" color="inherit" className={styles.tabs}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="off"
              aria-label="scrollable prevent tabs example"
            >
              <Tab classNames label="All Item" {...a11yProps(0)} />
              {category.map((item, index) => (
                <Tab key={index} label={item} {...a11yProps(index + 1)} />
              ))}
            </Tabs>
          </AppBar>
        </div>
        <div className={styles.filterContainer}>
          <Typography
            variant="p"
            type="reguler"
            className={styles.countProductText}
          >
            123 Product
          </Typography>
          <div className={styles.filterBtnContainer}>
            <Button
              variant="icon"
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
          <ProductList data={product} />
        </div>
      </Box>
    </>
  );
};

export default Component;
