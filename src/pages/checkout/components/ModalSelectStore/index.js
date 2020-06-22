import {
    AppBar, Dialog, IconButton, Slide,
    Grid,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import React from 'react';
import Typography from '@components/Typography';
import Button from '@components/Button';
import { useTranslation } from '@i18n';
import classNames from 'classnames';
import useStyles from './style';

const demoStore = [
    {
        name: 'Bali Store',
        address: 'Jalan raya bali 1, Kuta, Denpasar, Bali, ID',
        phoneNumber: '01222212',
    },
    {
        name: 'Jogja Store',
        address: 'Jalan raya malioboro no 102 DI Yogyakarta ID',
        phoneNumber: '0999221',
    },
];

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const FilterDialog = ({
    open, setOpen, checkout, setCheckout,
}) => {
    const { t } = useTranslation(['common', 'checkout', 'validate']);
    const styles = useStyles();
    const [selected, setSelected] = React.useState({
        key: null,
        item: null,
    });
    const handleSelect = async (key, item) => {
        setSelected({
            key,
            item,
        });
    };
    const handleSave = async () => {
        await setCheckout({
            ...checkout,
            selectStore: {
                ...selected.item,
            },
        });
        setOpen();
    };
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition} onClose={setOpen}>
            <AppBar className={styles.appBar}>
                <IconButton className={styles.btnClose} edge="start" onClick={setOpen} aria-label="close">
                    <CloseIcon className={styles.iconClose} />
                </IconButton>
                <Typography variant="label" type="bold" align="center" letter="uppercase" className={styles.title}>
                    {t('checkout:pickupInformation:label')}
                </Typography>
            </AppBar>
            <div className={styles.body}>
                <Grid container>
                    {
                        demoStore.map((item, index) => (
                            <Grid item key={index} onClick={() => handleSelect(index, item)}>
                                <div className={selected.key === index ? classNames(styles.card, styles.cardActive) : styles.card}>
                                    <Typography variant="span" type="bold">
                                        {item.name}
                                    </Typography>
                                    <Typography>
                                        {`${item.address} ${item.phoneNumber}`}
                                    </Typography>
                                </div>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
            <div className={styles.footer}>
                <Button className={styles.btnSave} onClick={handleSave}>{t('common:button:save')}</Button>
            </div>
        </Dialog>
    );
};

export default FilterDialog;
