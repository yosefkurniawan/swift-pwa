import React from "react";
import useStyles from "../style";
import { Grid, Box, Paper, Tabs, Tab, AppBar } from "@material-ui/core";
import Header from "../../../commons/Header";
import Banner from "../../../commons/slider/Banner";

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

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const Component = () => {
  const styles = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box className={styles.container}>
      <div className={styles.headContainer}>
        <Header className={styles.header} />
        {/* <Banner data={data} /> */}
      </div>
      <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab label="App" {...a11yProps(0)} />
          <Tab label="App2" {...a11yProps(1)} />
          <Tab label="App3" {...a11yProps(2)} />
          <Tab label="App4" {...a11yProps(3)} />
          <Tab label="App5" {...a11yProps(4)} />
          <Tab label="App6" {...a11yProps(5)} />
          <Tab label="App7" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      </div>
      <div>filter</div>
      <div>produk</div>
    </Box>
  );
};

export default Component;
