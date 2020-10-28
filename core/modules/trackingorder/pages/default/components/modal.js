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

import useStyles from './style';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ModalResult = (props) => {
    const { open, setOpen, t, orders } = props;
    const styles = useStyles();

    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const content = () => {
        const data = orders.data[0];
        if (orders.data.length > 0) {
            let { detail } = data;
            detail = detail[0];
            const items = [];
            if (detail.shipping_methods.shipping_detail[0].data_detail) {
                let dt = detail.shipping_methods.shipping_detail[0].data_detail;
                if (dt.includes(':')) {
                    dt = dt.replace(/'/g, '`');
                    dt = dt.replace(/"/g, "'");
                    dt = dt.replace(/`/g, '"');
                    dt = JSON.parse(dt);
                    Object.keys(dt).map((key) => {
                        items.push({
                            primary: startCase(key),
                            secondary: dt[key],
                        });
                    });
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
