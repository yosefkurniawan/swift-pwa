import {
    AppBar, Dialog, IconButton, Slide,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import React from 'react';
import Typography from '@components/Typography';
import Button from '@components/Button';
import TextField from '@components/Forms/TextField';
import { useTranslation } from '@i18n';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { regexPhone } from '@helpers/regex';
import useStyles from './style';
import gqlService from '../../services/graphql';

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

const FilterDialog = ({
    open,
    setOpen,
    checkout,
    setCheckout,
}) => {
    const { t } = useTranslation(['common', 'checkout', 'validate']);
    const styles = useStyles();
    const [setPickupStore] = gqlService.setPickupStore();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        person: Yup.string().required(`${t('checkout:pickupInformation:pickupPerson')} ${t('validate:required')}`),
        phoneNumber: Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
    });

    const formik = useFormik({
        initialValues: {
            email: checkout.pickupInformation.email || '',
            phoneNumber: checkout.pickupInformation.phoneNumber || '',
            person: checkout.pickupInformation.person || '',
        },
        validationSchema,
        onSubmit: async (values) => {
            const pickupInformation = {
                pickup_person_email: values.email,
                pickup_person_name: values.person,
                pickup_person_phone: values.phoneNumber,
            };
            await window.backdropLoader(true);
            if (Object.keys(checkout.selectStore).length > 0) {
                await setPickupStore({
                    variables: {
                        cart_id: checkout.data.cart.id,
                        code: checkout.selectStore.code,
                        extension_attributes: pickupInformation,
                        store_address: {
                            city: checkout.selectStore.city,
                            country_code: checkout.selectStore.country_id,
                            name: checkout.selectStore.name,
                            postcode: checkout.selectStore.postcode,
                            region: checkout.selectStore.region,
                            street: [checkout.selectStore.street],
                            telephone: checkout.selectStore.telephone,
                        },
                    },
                }).then(async (res) => {
                    await setCheckout({
                        ...checkout,
                        data: {
                            ...checkout.data,
                            cart: res.data.setPickupStore,
                        },
                        pickupInformation,
                    });
                    await window.backdropLoader(false);
                    setOpen();
                }).catch((e) => {
                    console.log(e);
                    window.backdropLoader(false);
                });
            } else {
                await setCheckout({
                    ...checkout,
                    pickupInformation,
                });
                await window.backdropLoader(false);
                setOpen();
            }
        },
    });


    return (
        <Dialog
            fullScreen
            open={open}
            TransitionComponent={Transition}
            onClose={setOpen}
        >
            <AppBar className={styles.appBar}>
                <IconButton
                    className={styles.btnClose}
                    edge="start"
                    onClick={setOpen}
                    aria-label="close"
                >
                    <CloseIcon className={styles.iconClose} />
                </IconButton>
                <Typography
                    variant="label"
                    type="bold"
                    align="center"
                    letter="uppercase"
                    className={styles.title}
                >
                    {t('checkout:pickupInformation:label')}
                </Typography>
            </AppBar>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.body}>
                    <TextField
                        label={t('checkout:pickupInformation:pickupPerson')}
                        name="person"
                        value={formik.values.person}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.person && formik.errors.person)}
                        errorMessage={(formik.touched.person && formik.errors.person) || null}
                    />
                    <TextField
                        label={t('common:form:phoneNumber')}
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                        errorMessage={(formik.touched.phoneNumber && formik.errors.phoneNumber) || null}
                    />
                    <TextField
                        label="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.email && formik.errors.email)}
                        errorMessage={(formik.touched.email && formik.errors.email) || null}
                    />
                </div>

                <div className={styles.footer}>
                    <Button className={styles.btnSave} type="submit">
                        {t('common:button:save')}
                    </Button>
                </div>
            </form>
        </Dialog>
    );
};

export default FilterDialog;
