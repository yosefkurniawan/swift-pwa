import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@components/Typography';
import Arrow from '@material-ui/icons/ArrowDropDown';
import Radio from '@components/Forms/Radio';
import RadioItem from '../RadioDeliveryItem';

import {
    ExpanDetailStyle,
    ExpanPanelStyle,
    ExpanSummaryStyle,
    useStyles,
} from './style';

const ExpansionPanel = withStyles(ExpanPanelStyle)(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles(ExpanSummaryStyle)(
    MuiExpansionPanelSummary,
);

const ExpansionPanelDetails = withStyles(ExpanDetailStyle)(
    MuiExpansionPanelDetails,
);

const paymentsData = [
    { label: 'Gopay', value: 'gopay' },
    { label: 'Bank', value: 'bank' },
];

export default function CustomizedExpansionPanels({ data = [1, 2, 3, 5] }) {
    const styles = useStyles();
    const [expanded, setExpanded] = React.useState(null);
    const [payment, setPayment] = React.useState([]);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div className={styles.container}>
            {data.map((item, index) => (
                <ExpansionPanel
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                    key={index}
                >
                    <ExpansionPanelSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                        expandIcon={<Arrow className={styles.icon} />}
                    >
                        <Typography letter="uppercase" variant="span" type="bold">
                            Bank Tranfer
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Radio
                            value={payment}
                            onChange={setPayment}
                            valueData={paymentsData}
                            CustomItem={RadioItem}
                            propsItem={{
                                borderBottom: false,
                                RightComponent: <img src="/assets/img/sample/cimb.png" className={styles.imgList} alt="cimb" />,
                            }}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
    );
}
