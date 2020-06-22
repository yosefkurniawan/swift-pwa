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
            await setCheckout({
                ...checkout,
                pickupInformation: {
                    ...values,
                },
            });
            setOpen();
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
            <div className={styles.body}>
                <TextField
                    label={t('checkout:pickupInformation:pickupPerson')}
                    name="person"
                    value={formik.values.person}
                    onChange={formik.handleChange}
                />
                <TextField
                    label={t('common:form:phoneNumber')}
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                />
                <TextField
                    label="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
            </div>

            <div className={styles.footer}>
                <Button className={styles.btnSave} onClick={formik.handleSubmit}>
                    {t('common:button:save')}
                </Button>
            </div>
        </Dialog>
    );
};

export default FilterDialog;
