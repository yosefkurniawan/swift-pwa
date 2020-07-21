import Typography from '@Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Button from '@Button';
import TextField from '@components/Forms/TextField';
import { formatPrice } from '@helpers/currency';
import { debuging } from '@config';
import { getGiftCard } from '../services/graphql';
import ModalDetail from './ModalDetail';
import Loader from './Loader';
import useStyles from './style';

const GiftCard = (props) => {
    const { t, storeConfig } = props;
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
                {debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')}
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
            <ModalDetail t={t} storeConfig={storeConfig} open={open} setOpen={handleClose} code={selectedCode} />
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
                                    {formatPrice(item.giftcard_balance, storeConfig.base_currency_code)}
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
