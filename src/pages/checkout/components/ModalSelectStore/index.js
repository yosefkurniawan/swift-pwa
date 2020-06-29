/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
    AppBar, Dialog, IconButton, Slide,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import React from 'react';
import Typography from '@components/Typography';
import Button from '@components/Button';
import { useTranslation } from '@i18n';
import classNames from 'classnames';
import useStyles from './style';
import gqlService from '../../services/graphql';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ModalSelectStore = ({
    open, setOpen, checkout, setCheckout,
    listStores = [],
}) => {
    const { t } = useTranslation(['common', 'checkout', 'validate']);
    const styles = useStyles();
    const [setPickupStore] = gqlService.setPickupStore();
    const [selected, setSelected] = React.useState({
        key: null,
        item: null,
    });
    const [loading, setLoading] = React.useState(false);
    const handleSelect = async (key, item) => {
        setSelected({
            key,
            item,
        });
    };
    const handleSave = async () => {
        await setLoading(true);
        if (Object.keys(checkout.pickupInformation).length > 0) {
            await setPickupStore({
                variables: {
                    cart_id: checkout.data.cart.id,
                    code: selected.item.code,
                    extension_attributes: checkout.pickupInformation,
                    store_address: {
                        city: selected.item.city,
                        country_code: selected.item.country_id,
                        name: selected.item.name,
                        postcode: selected.item.postcode,
                        region: selected.item.region,
                        street: [selected.item.street],
                        telephone: selected.item.telephone,
                    },
                },
            }).then(async (res) => {
                const paymentMethod = res.data.setPickupStore.available_payment_methods.map((method) => ({
                    ...method,
                    label: method.title,
                    value: method.code,
                    image: null,
                }));
                await setCheckout({
                    ...checkout,
                    data: {
                        ...checkout.data,
                        cart: res.data.setPickupStore,
                        paymentMethod,
                    },
                    selectStore: {
                        ...selected.item,
                    },
                    error: {
                        selectStore: false,
                        pickupInformation: false,
                    },
                });
                await setLoading(false);
                setOpen();
            }).catch(() => {
                // console.log(e);
                setLoading(false);
            });
        } else {
            await setCheckout({
                ...checkout,
                selectStore: {
                    ...selected.item,
                },
                error: {
                    ...checkout.error,
                    pickupInformation: true,
                },
            });

            await setLoading(false);
            setOpen();
        }
    };
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition} onClose={setOpen}>
            <AppBar className={styles.appBar}>
                <IconButton className={styles.btnClose} edge="start" onClick={setOpen} aria-label="close">
                    <CloseIcon className={styles.iconClose} />
                </IconButton>
                <Typography variant="label" type="bold" align="center" letter="uppercase" className={styles.title}>
                    {t('checkout:pickupInformation:selectStoreLocation')}
                </Typography>
            </AppBar>
            <div className={styles.container}>
                <div className={styles.body}>
                    {
                        listStores.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelect(index, item)}
                                className={selected.key === index ? classNames(styles.card, styles.cardActive) : styles.card}
                            >
                                <Typography variant="span" type="bold">
                                    {item.name}
                                </Typography>
                                <Typography>
                                    {item.street}
                                    <br />
                                    {item.city}
                                    <br />
                                    {item.region}
                                    <br />
                                    {item.country_id}
                                    <br />
                                    {item.postcode}
                                    <br />
                                    {item.telephone}
                                </Typography>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.footer}>
                    <Button loading={loading} className={styles.btnSave} onClick={handleSave}>{t('common:button:save')}</Button>
                </div>
            </div>
        </Dialog>
    );
};

export default ModalSelectStore;
