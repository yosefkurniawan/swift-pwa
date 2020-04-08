import useStyles from "./style";
import Button from "@components/Button";
import Typography from "@components/Typography";
import {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanel,
} from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import classNames from 'classnames'

const Summary = ({ t, item = [1, 2, 3, 4, 5] }) => {
  const styles = useStyles();
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className={styles.footer}>
      <ExpansionPanel
        expanded={expanded === 1}
        onChange={handleChange(1)}
        className={styles.expand}
      >
        <ExpansionPanelSummary
          classes={{
            root: styles.expanHead,
            expanded: styles.expandHeadOpen,
          }}
        >
          {expanded === 1 ? <ExpandLess /> : <ExpandMore />}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={styles.expanBody}>
          {item.map((i) => (
            <div className={styles.listSummary} key={i}>
              <Typography variant="span" letter="capitalize">
                Subtotal
              </Typography>
              <Typography variant="span" letter="uppercase">
                IDR 200.000
              </Typography>
            </div>
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <div className={styles.listSummary}>
        <Typography variant="title" type="bold" letter="capitalize">
          Total
        </Typography>
        <Typography variant="title" type="bold" letter="uppercase">
          IDR 200.000
        </Typography>
      </div>
      <Button className={styles.btnSave}>{t("checkout:placeOrder")}</Button>
    </div>
  );
};

export default Summary;
