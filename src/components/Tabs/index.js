import React from 'react';
import {
    makeStyles, AppBar, Tabs, Tab,
} from '@material-ui/core';
import { GRAY_SECONDARY } from '@theme/colors';

const useStyles = makeStyles(() => ({
    tabs: {
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_SECONDARY}`,
    },
}));

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}

const CustomTabs = ({ data = [], onChange, value }) => {
    const styles = useStyles();
    const [localValue, setLocalValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setLocalValue(newValue);
    };
    return (
        <AppBar position="static" color="inherit" className={styles.tabs}>
            <Tabs
                value={value || localValue}
                onChange={onChange || handleChange}
                variant="scrollable"
                scrollButtons="off"
                aria-label="scrollable prevent tabs example"
            >
                <Tab label="All Item" {...a11yProps(0)} />
                {data.map((item, index) => {
                    const itemData = item.label ? item : { label: item };
                    return <Tab key={index} {...itemData} {...a11yProps(index + 1)} />;
                })}
            </Tabs>
        </AppBar>
    );
};

export default CustomTabs;
