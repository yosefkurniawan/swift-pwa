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
import { startCase } from 'lodash';
import {modules} from '@config';
import dayjs from 'dayjs';
import Link from 'next/link';

import {checkJson} from '../helpers/checkJson';
import useStyles from './style';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ModalResult = (props) => {
    const { open, setOpen, t, orders } = props;
    const styles = useStyles();
    const {trackingorder} = modules;

    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const content = () => {
        const data = orders.data[0];
        if (orders.data.length > 0) {
            let { detail } = data;
            detail = detail[0];
            const items = [];
            let gosend = detail.shipping_methods.shipping_description.match(/go-send/i);
            if (detail.shipping_methods.shipping_detail[0].data_detail) {
                let dt = detail.shipping_methods.shipping_detail[0].data_detail;
                dt = dt.replace(/'/g, '`');
                dt = dt.replace(/"/g, "'");
                dt = dt.replace(/`/g, '"');
                if (checkJson(dt) && !JSON.parse(dt).errors) {
                    dt = JSON.parse(dt);
                    const keys = Object.keys(dt);
                    const listField = gosend ? trackingorder.fieldDetail.gosend : trackingorder.fieldDetail.shipperid;
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
                                )
                            }
                            
                            if (secondary !== null && secondary.length <= 30 ) {
                                const date = dayjs(secondary).format('YYYY MM DD HH:mm:ss')
                                if (date !== 'Invalid Date') secondary = date;
                            }
                            items.push({
                                primary: startCase(keys[idx]),
                                secondary,
                            });
                        }
                    }
                } else {
                    items.push({
                        primary: t('trackingorder:status'),
                        secondary: dt,
                    });
                }
            }
            return (
                <div className="row">
                    <div className="col-xs-12">
                        <List>
                            {items.map((item, i) => (
                                <ListItem key={i} className={styles.listItem}>
                                    <ListItemText 
                                        className={styles.label}
                                        primary={(
                                            <Typography letter="capitalize"  className="clear-margin-padding">{item.primary}</Typography>
                                        )} />
                                    <ListItemSecondaryAction className={styles.detail}>
                                        <Typography variant="span" type="regular"  className="clear-margin-padding">
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
