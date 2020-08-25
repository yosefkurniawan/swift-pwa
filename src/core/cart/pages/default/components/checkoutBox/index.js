import Slide from '@material-ui/core/Slide';
import Typography from '@common_typography';
import Button from '@common_button';
import Router from 'next/router';
import { useState } from 'react';
import ExpansionPanel from '@material-ui/core/Accordion';
import ExpansionPanelDetails from '@material-ui/core/AccordionDetails';
import ExpansionPanelSummary from '@material-ui/core/AccordionSummary';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { formatPrice } from '@helpers/currency';
import useStyles from './style';

const CheckoutDrawer = ({ editMode, t, summary }) => {
    const styles = useStyles();
    const handleOnCheckoutClicked = () => {
        Router.push('/checkout');
    };
    const [expanded, setExpanded] = useState(null);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const { data, total } = summary;
    return (
        <Slide direction="up" in={!editMode} mountOnEnter unmountOnExit>
            <div className={styles.checkoutBox}>
                <ExpansionPanel expanded={expanded === 1} onChange={handleChange(1)} className={styles.expand}>
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
                                </Typography>
                            </div>
                        ))}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <div className={styles.summary}>
                    <Typography variant="span" type="bold" align="center" letter="capitalize" className={styles.subtotal}>
                        Total
                    </Typography>
                    &nbsp;
                    <Typography variant="span" type="bold" align="center" letter="capitalize" className={styles.subtotal}>
                        {total.currency ? formatPrice(total.value, total.currency) : null}
                    </Typography>
                </div>
                <div className={styles.actions}>
                    <Button customRootStyle={{ width: 'fit-content' }} className={styles.goToCheckout} onClick={handleOnCheckoutClicked}>
                        {t('common:button:checkout')}
                    </Button>
                </div>
            </div>
        </Slide>
    );
};

export default CheckoutDrawer;
