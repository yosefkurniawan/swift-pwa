import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@common_typography';
import ExpandMoreIcon from '@material-ui/icons/Add';
import Minimize from '@material-ui/icons/Minimize';
import classNames from 'classnames';
import HtmlParser from 'react-html-parser';
import useStyles from './style';

export default function ExpandDetail({ data = [1, 2, 3] }) {
    const styles = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={styles.root}>
            {data.map((item, index) => (
                <ExpansionPanel
                    key={index}
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                    className={styles.expandContainer}
                >
                    <ExpansionPanelSummary
                        expandIcon={
                            expanded === index ? (
                                <Minimize className={styles.icon} />
                            ) : (
                                <ExpandMoreIcon className={styles.icon} />
                            )
                        }
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={
                            expanded === index
                                ? classNames(styles.headerExpand, styles.headerOpen)
                                : styles.headerExpand
                        }
                    >
                        <Typography letter="uppercase" variant="span" type="bold">
                            { item.title || '' }
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails
                        className={
                            expanded === index
                                ? classNames(styles.bodyExpand, styles.bodyOpen)
                                : styles.bodyExpand
                        }
                    >
                        {
                            item.type === 'html'
                                ? (
                                    <div className={styles.descriptionHtml}>
                                        {item.content && HtmlParser(item.content)}
                                    </div>
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
                                )
                        }
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
    );
}
