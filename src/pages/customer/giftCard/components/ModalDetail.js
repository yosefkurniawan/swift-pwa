import Header from '@components/Header';
import Typography from '@components/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import { debuging } from '@config';
import React from 'react';
import { formatPrice } from '@helpers/currency';
import { checkBalance } from '../services/graphql';
import Loader from './Loader';

const ModalDetail = ({
    open, setOpen, code, storeConfig, t,
}) => {
    let loading = false;
    let data = null;
    let error = null;
    if (open) {
        const getBalance = checkBalance(code);
        loading = getBalance.loading;
        data = getBalance.data;
        error = getBalance.error;
    }
    if (error) {
        return (
            <Alert className="m-15" severity="error">
                {debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')}
            </Alert>
        );
    }
    let detail;
    if (loading || !data) detail = () => (<Loader />);
    if (data) {
        detail = () => (
            <List>
                {
                    Object.keys(data.giftCardAccount).map((item) => {
                        if (item !== '__typename' && data.giftCardAccount[item] !== '' && data.giftCardAccount[item] !== null) {
                            return (
                                <ListItem key={item}>
                                    <ListItemText primary={(
                                        <Typography letter="capitalize">
                                            {
                                                item.split('_').map((text) => (`${text} `))
                                            }
                                        </Typography>
                                    )}
                                    />
                                    <ListItemSecondaryAction>
                                        <Typography variant="span" type="bold">
                                            {
                                                // eslint-disable-next-line no-restricted-globals
                                                isNaN(data.giftCardAccount[item]) ? data.giftCardAccount[item]
                                                    : formatPrice(data.giftCardAccount[item], storeConfig.base_currency_code)
                                            }
                                        </Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        }
                        return null;
                    })
                }
            </List>
        );
    }
    return (
        <Dialog open={open} onClose={setOpen} fullScreen maxWidth="sm">
            <DialogTitle>
                <Header
                    LeftComponent={{
                        onClick: setOpen,
                    }}
                    pageConfig={{
                        headerTitle: `Detail gift card code: ${code}`,
                        headerBackIcon: 'close',
                        header: 'relative',
                    }}
                />
            </DialogTitle>
            <DialogContent>
                {detail()}
            </DialogContent>
        </Dialog>
    );
};

export default ModalDetail;
