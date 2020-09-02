import Radio from '@common_forms/Radio';
import Typography from '@common_typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { formatPrice } from '@helpers/currency';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { withStyles } from '@material-ui/core/styles';
import Arrow from '@material-ui/icons/ArrowDropDown';
import DeliveryItem from '../../../../components/radioitem';
import useStyles from '../style';

import {
    ExpanDetailStyle,
    ExpanPanelStyle,
    ExpanSummaryStyle,
    IconAccordion,
} from './style';

const IconLabel = withStyles(IconAccordion)(
    ({ classes, label }) => <div className={classes[label]} />,
);

const Accordion = withStyles(ExpanPanelStyle)(MuiAccordion);

const AccordionSummary = withStyles(ExpanSummaryStyle)(
    MuiAccordionSummary,
);

const AccordionDetails = withStyles(ExpanDetailStyle)(
    MuiAccordionDetails,
);

const Loader = () => (
    <>
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
    </>
);

const ShippingView = (props) => {
    const styles = useStyles();
    const {
        checkout,
        storeConfig,
        loading,
        selected,
        handleShipping,
        data,
        t,
    } = props;
    let content;
    const [expanded, setExpanded] = React.useState(null);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    if (checkout.selected.delivery === 'pickup') {
        const price = formatPrice(0, storeConfig.base_currency_code || 'IDR');
        content = <DeliveryItem value={{ price }} label={t('checkout:pickupStore')} selected borderBottom={false} />;
    } else if (loading.shipping || loading.addresses || loading.all) {
        content = <Loader />;
    } else if (data.shippingMethods.length !== 0) {
        const available = data.shippingMethods;
        const config = JSON.parse(`${storeConfig.shipments_configuration}`);
        const group = config ? Object.keys(config) : [];
        const shipping = [];
        for (let index = 0; index < group.length; index += 1) {
            const groupData = [];
            const key = group[index];
            let cnf = config[key];
            cnf = cnf.split(',');
            for (let idx = 0; idx < available.length; idx += 1) {
                const element = available[idx];
                const identifier = `${element.carrier_code}_${element.method_code}`;
                for (let idc = 0; idc < cnf.length; idc += 1) {
                    if (identifier.match(new RegExp(`^${cnf[idc]}`)) !== null) {
                        groupData.push(element);
                    }
                }
            }
            if (groupData.length > 0) {
                shipping.push({
                    group: key,
                    data: groupData,
                });
            }
        }

        const index = data.shippingMethods.findIndex((x) => x.carrier_code === 'pickup');
        if (index >= 0) {
            data.shippingMethods.splice(index, 1);
        }
        if (shipping.length > 0) {
            content = (
                <div className={styles.paymentExpansionContainer}>
                    {shipping.map((item, keyIndex) => {
                        if (item.data.length !== 0) {
                            return (
                                <Accordion
                                    expanded={expanded === keyIndex}
                                    onChange={handleChange(keyIndex)}
                                    key={keyIndex}
                                >
                                    <AccordionSummary
                                        aria-controls="panel1d-content"
                                        id="panel1d-header"
                                        expandIcon={<Arrow className={styles.icon} />}
                                    >
                                        <div className={styles.labelAccordion}>
                                            <IconLabel label={item.group.replace('sg-', '')} />
                                            <Typography letter="uppercase" variant="span" type="bold">
                                                {item.group.replace('sg-', '')}
                                            </Typography>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {item.data.length !== 0 ? (
                                            <Radio
                                                value={selected.shipping}
                                                onChange={handleShipping}
                                                valueData={item.data}
                                                CustomItem={DeliveryItem}
                                                classContainer={styles.radioShiping}
                                                propsItem={{
                                                    borderBottom: false,
                                                    classContent: styles.listShippingGroup,
                                                }}
                                            />
                                        ) : null}
                                    </AccordionDetails>
                                </Accordion>
                            );
                        }
                        return null;
                    })}
                </div>
            );
        } else {
            content = (
                <Radio
                    value={selected.shipping}
                    onChange={handleShipping}
                    classContainer={styles.listShipping}
                    CustomItem={DeliveryItem}
                    valueData={data.shippingMethods}
                />
            );
        }
    } else {
        content = <Typography variant="p">{t('checkout:noShipping')}</Typography>;
    }

    return (
        <div className={styles.block}>
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:shippingMethod')}
            </Typography>
            {content}
        </div>
    );
};

export default ShippingView;
