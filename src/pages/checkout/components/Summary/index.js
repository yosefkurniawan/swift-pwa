import Button from '@components/Button';
import Typography from '@components/Typography';
import currency from '@helpers/currency';
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import useStyles from './style';

const Summary = ({ t, data = [1, 2, 3, 4, 5], onClick, total }) => {
    const styles = useStyles();
    const [expanded, setExpanded] = React.useState(null);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const totalSummary = total ? total:0;
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
                                {list.value}
                                {/* {currency({ currency: 'idr', value: list.value })} */}
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
                        totalSummary
                    }
                </Typography>
            </div>
            <Button onClick={onClick} className={styles.btnSave}>
                {t('checkout:placeOrder')}
            </Button>
        </div>
    );
};

export default Summary;
