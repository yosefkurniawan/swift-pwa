import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@components/Typography";
import ExpandMoreIcon from "@material-ui/icons/Add";
import Minimize from "@material-ui/icons/Minimize";
import useStyles from "./style";
import classNames from "classnames";

export default function ExpandDetail({ data = [1, 2, 3] }) {
  const styles = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={styles.root}>
      {data.map(item => (
        <ExpansionPanel
          key={item}
          expanded={expanded === item}
          onChange={handleChange(item)}
          className={styles.expandContainer}
        >
          <ExpansionPanelSummary
            expandIcon={
              expanded === item ? (
                <Minimize className={styles.icon} />
              ) : (
                <ExpandMoreIcon className={styles.icon} />
              )
            }
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className={
              expanded === item
                ? classNames(styles.headerExpand, styles.headerOpen)
                : styles.headerExpand
            }
          >
            <Typography letter="uppercase" variant="span" type="bold">
              Size & Fit
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={
              expanded === item
                ? classNames(styles.bodyExpand, styles.bodyOpen)
                : styles.bodyExpand
            }
          >
            <Typography variant="p" type="reguler">
              100% Cotton Light Weight Machine wash cold. Wash with similar
              colors Medium iron temperature
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}
