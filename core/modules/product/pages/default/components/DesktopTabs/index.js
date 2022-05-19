/* eslint-disable react/no-danger */
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useStyles from '@core_modules/product/pages/default/components/ExpandDetail/style';
import ListReviews from '@core_modules/product/pages/default/components/ListReviews';
import CmsRenderer from '@core_modules/cms/components/cms-renderer';

function TabPanel(props) {
    const {
        children, value, index, ...other
    } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            style={{ minHeight: 250 }}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const TabsView = (props) => {
    const { dataInfo } = props;
    const { smartProductTabs } = props;
    const styles = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Paper square>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {dataInfo.map((val, idx) => <Tab label={val.title} key={idx} />)}
                    <Tab label="Reviews" />
                    {
                        Object.values(smartProductTabs).map((val, idx) => {
                            if (val.label) {
                                return (<Tab label={val.label} key={idx} />);
                            }
                            return null;
                        })
                    }
                </Tabs>
            </AppBar>
            {dataInfo.map((item, index) => (
                <TabPanel value={value} index={index} key={index} dir={theme.direction}>
                    {item.type === 'html'
                        ? (
                            <>
                                <div className="description-html">
                                    {item.content ? <span dangerouslySetInnerHTML={{ __html: item.content }} /> : null}
                                </div>
                                <style jsx>
                                    {`
                                        .description-html {
                                            font-family: 'Montserrat',
                                            font-size: 10px,
                                        }
                                        
                                        .description-html img {
                                            width: '100%',
                                            height: '100%',
                                        }

                                        .description-html iframe {
                                            width: '100%',
                                            height: '100%',
                                        }

                                        @media screen and (max-width: 768px) {
                                            .description-html {
                                                width: 320px,
                                                height: '100%',
                                            }

                                            .description-html img {
                                                max-width: 300px,
                                            }

                                            .description-html iframe {
                                                max-width: 300px,
                                            }
                                        }
                                        @media screen and (min-width: 769px) and (max-width: 1024px) {
                                            .description-html {
                                                width: 700px,
                                                height: '100%',
                                            }

                                            .description-html img {
                                                max-width: 650px,
                                            }

                                            .description-html iframe {
                                                max-width: 650px,
                                            }
                                        }
                                        @media screen and (min-width: 1025px) {
                                            .description-html {
                                                width: 850px,
                                                height: '100%',
                                            }

                                            .description-html img {
                                                max-width: 800px,
                                            }

                                            .description-html iframe {
                                                max-width: 800px,
                                            }
                                        }
                                    `}
                                </style>
                            </>
                        )
                        : item.type === 'array' && (
                            <List>
                                {
                                    item.content.map((content, idx) => (
                                        <ListItem key={idx}>
                                            <ListItemText
                                                primary={content.label}
                                                secondary={content.value}
                                                classes={{
                                                    primary: styles.listLabel,
                                                    secondary: styles.listValue,
                                                }}
                                            />
                                        </ListItem>
                                    ))
                                }
                            </List>
                        )}
                </TabPanel>
            ))}
            <TabPanel value={value} index={dataInfo.length} dir={theme.direction}>
                <ListReviews {...props} />
            </TabPanel>
            {
                Object.values(smartProductTabs).map((val, idx) => {
                    if (val.label) {
                        return (
                            <TabPanel key={idx} value={value} index={dataInfo.length + idx} dir={theme.direction}>
                                <CmsRenderer content={val.content} />
                            </TabPanel>
                        );
                    }
                    return null;
                })
            }
        </Paper>
    );
};

export default TabsView;
