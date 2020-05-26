import Typography from '@components/Typography';
import {
    List, ListItem, ListItemSecondaryAction, ListItemText, Divider,
} from '@material-ui/core';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Button from '@components/Button';
import TextField from '@components/Forms/TextField';
import { getGiftCard } from '../services/graphql';
import ModalDetail from './ModalDetail';
import Loader from './Loader';
import useStyles from './style';

const GiftCard = ({ t }) => {
    const styles = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedCode, setSelectedCode] = React.useState('');
    const [search, setSearch] = React.useState({
        value: '',
        error: null,
    });
    const { loading, data, error } = getGiftCard();
    if (error) {
        return (
            <Alert className="m-15" severity="error">
                {error.message.split(':')[1]}
            </Alert>
        );
    }
    if (loading || !data) return <Loader />;
    const handleOpenModal = (code) => {
        setSelectedCode(code);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedCode('');
    };
    const handleTextSearch = (event) => {
        setSearch({
            value: event.target.value,
            error: '',
        });
    };
    const handleSearch = () => {
        if (search.value === '' || !search.value) {
            setSearch({
                error: t('customer:giftCard:required'),
                variant: '',
            });
        } else {
            handleOpenModal(search.value);
        }
    };
    return (
        <div>
            <ModalDetail open={open} setOpen={handleClose} code={selectedCode} />
            {data && data.customer.gift_card.length === 0 && (
                <Alert className="m-15" severity="warning">
                    {t('customer:giftCard:notFound')}
                </Alert>
            )}
            <List>
                {data
                    && data.customer.gift_card.map((item, index) => (
                        <ListItem key={index} onClick={() => handleOpenModal(item.giftcard_code)}>
                            <ListItemText primary={item.giftcard_code} />
                            <ListItemSecondaryAction>
                                <Typography variant="span" type="bold">
                                    {item.giftcard_balance}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
            </List>
            <Divider />
            <div className={styles.searchBox}>
                <TextField
                    label={t('customer:giftCard:inputSearch')}
                    value={search.value}
                    onChange={handleTextSearch}
                    error={!((search.error === '' || search.error === null))}
                    errorMessage={search.error || ''}
                />
                <Button onClick={handleSearch}>
                    <Typography letter="capitalize" color="white">
                        {t('customer:giftCard:buttonSearch')}
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

export default GiftCard;
