/* eslint-disable react/jsx-wrap-multilines */
import Header from '@common_headermobile';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@common_typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Alert from '@material-ui/lab/Alert';
import formatDate from '@helper_date';
import { startCase } from 'lodash';
import { modules } from '@config';
import Link from 'next/link';

import { checkJson } from '@core_modules/trackingorder/pages/default/helpers/checkJson';
import useStyles from '@core_modules/trackingorder/pages/default/components/style';
import ShipperJNE from '@core_modules/trackingorder/pages/default/components/shipper/jne';
import ShipperAnterAja from '@core_modules/trackingorder/pages/default/components/shipper/anterAja';
import ShipperSAP from '@core_modules/trackingorder/pages/default/components/shipper/sap';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ModalResult = (props) => {
    const {
        open, setOpen, t, orders, modalType, modalData,
    } = props;
    const styles = useStyles();
    const { trackingorder } = modules;

    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const content = () => {
        const data = orders.data[0];
        if (orders.data.length > 0) {
            let { detail } = data;
            [detail] = detail;
            const shippingMethods = detail.shipping_methods.shipping_detail;

            const items = [];
            const gosend = detail.shipping_methods.shipping_description?.match(/go-send/i) || '';

            let trackOrder;

            shippingMethods.forEach((method) => {
                const { data_detail } = method;
                if (data_detail) {
                    let dt = data_detail;
                    dt = dt.replace(/'/g, '`');
                    dt = dt.replace(/"/g, "'");
                    dt = dt.replace(/`/g, '"');

                    if (checkJson(dt) && !JSON.parse(dt).errors) {
                        dt = JSON.parse(dt);

                        const listField = gosend ? trackingorder.fieldDetail.gosend : trackingorder.fieldDetail.shipperid;

                        if (modalType === 'Anteraja') {
                            const AnterajaContent = modalData.content || {};
                            const nameReceiver = AnterajaContent.order?.receiver.name;
                            const description = AnterajaContent.history && AnterajaContent.history[0].message.id;
                            const updateDate = AnterajaContent.history && AnterajaContent.history[0].timestamp;
                            trackOrder = (
                                <ShipperAnterAja
                                    nameReceiver={nameReceiver}
                                    description={description}
                                    updateDate={updateDate}
                                    styles={styles}
                                    t={t}
                                />
                            );
                        } else if (modalType === 'JNE') {
                            const nameReceiver = modalData.cnote.cnote_receiver_name;
                            const description = modalData.cnote.keterangan;
                            const updateDate = modalData.cnote.cnote_date;
                            trackOrder = (
                                <ShipperJNE
                                    nameReceiver={nameReceiver}
                                    description={description}
                                    updateDate={updateDate}
                                    styles={styles}
                                    t={t}
                                />
                            );
                        } else if (modalType === 'SAP') {
                            const sap = modalData[modalData.length - 1];
                            const nameReceiver = sap.receiver_name;
                            const descriptionSap = sap.description;
                            const updateDate = sap.create_date;
                            trackOrder = (
                                <ShipperSAP
                                    nameReceiver={nameReceiver}
                                    description={descriptionSap}
                                    updateDate={updateDate}
                                    styles={styles}
                                    t={t}
                                />
                            );
                        } else {
                            const keys = Object.keys(dt);
                            for (let idx = 0; idx < keys.length; idx += 1) {
                                if (listField.includes(keys[idx])) {
                                    let secondary = dt[keys[idx]];
                                    if (secondary !== null && secondary !== '' && secondary.includes('http')) {
                                        secondary = (
                                            <Link href={secondary}>
                                                <a target="_blank" className="item-link">
                                                    {secondary}
                                                </a>
                                            </Link>
                                        );
                                    }

                                    if (secondary !== null && secondary.length <= 30) {
                                        const date = formatDate(secondary);
                                        if (date !== 'Invalid Date') secondary = date;
                                    }
                                    items.push({
                                        primary: startCase(keys[idx]),
                                        secondary,
                                    });
                                }
                            }
                        }
                    } else {
                        items.push({
                            primary: t('trackingorder:status'),
                            secondary: dt,
                        });
                    }
                }
            });

            return (
                <div className="row">
                    <div className="col-xs-12">
                        <List>
                            {trackOrder}
                            {items.map((item, i) => (
                                <ListItem key={i} className={styles.listItem}>
                                    <ListItemText
                                        className={styles.label}
                                        primary={
                                            <Typography letter="capitalize" className="clear-margin-padding">
                                                {item.primary}
                                            </Typography>
                                        }
                                    />
                                    <ListItemSecondaryAction className={styles.detail}>
                                        <Typography variant="span" type="regular" className="clear-margin-padding">
                                            {item.secondary}
                                        </Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                    <style jsx global>
                        {`
                            .label-result {
                                font-size: 20px;
                                margin-top: 30px;
                            }
                            .item-link {
                                font-weight: bold;
                                text-decoration: underline;
                            }
                        `}
                    </style>
                </div>
            );
        }
        return <Alert severity="warning">{t('trackingorder:orderNotFound')}</Alert>;
    };

    return (
        <>
            <Dialog
                maxWidth="sm"
                fullWidth={!!isDesktop}
                fullScreen={!isDesktop}
                open={open}
                onClose={() => setOpen(false)}
                TransitionComponent={Transition}
            >
                <DialogTitle>
                    <Header
                        LeftComponent={{
                            onClick: () => setOpen(false),
                        }}
                        pageConfig={{
                            headerTitle: t('trackingorder:trackingInformation'),
                            headerBackIcon: 'close',
                            header: 'relative',
                        }}
                    />
                </DialogTitle>
                <DialogContent>{content()}</DialogContent>
            </Dialog>
        </>
    );
};

export default ModalResult;
