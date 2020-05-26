import Header from '@components/Header';
import Typography from '@components/Typography';
import {
    Dialog, DialogContent, DialogTitle, List, ListItem, ListItemSecondaryAction, ListItemText,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { checkBalance } from '../services/graphql';
import Loader from './Loader';

const ModalDetail = ({ open, setOpen, code }) => {
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
                {error.message.split(':')[1]}
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
                                            {data.giftCardAccount[item]}
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
