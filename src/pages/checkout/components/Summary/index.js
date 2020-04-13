import Button from "@components/Button";
import Typography from "@components/Typography";
import currency from "@helpers/currency";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import useStyles from "./style";
import Routes from "next/router";

const Summary = ({ t, data = [1, 2, 3, 4, 5] }) => {
  const styles = useStyles();
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  let totalSummary = 0;
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
          {data.map((list, index) => (
            <div className={styles.listSummary} key={index}>
              <Typography variant="span" letter="capitalize">
                {list.item}
              </Typography>
              <Typography variant="span" letter="uppercase">
                {currency({ currency: "idr", value: list.value })}
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
          {
            (data.map((item) => {
              totalSummary += item.value;
            }),
            currency({ currency: "idr", value: totalSummary }))
          }
        </Typography>
      </div>
      <Button onClick={() => Routes.push("/thanks")} className={styles.btnSave}>
        {t("checkout:placeOrder")}
      </Button>
    </div>
  );
};

export default Summary;
