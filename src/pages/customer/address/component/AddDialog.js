/* eslint-disable consistent-return */
import Button from '@components/Button';
import TextField from '@components/Forms/TextField';
import IcubeMaps from '@components/GoogleMaps/Maps';
import Header from '@components/Header';
import Typography from '@components/Typography';
import Select from '@components/Forms/Select';
import { regexPhone } from '@helpers/regex';
import {
    Box, Dialog, FormControlLabel, Checkbox,
} from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import useStyles from './style';
import { getCountries } from '../services/graphql';

const AddAddressDialog = (props) => {
    const {
        firstName = '',
        lastName = '',
        street = '',
        posCode = '',
        country = '',
        state = '',
        city = '',
        phoneNumber = '',
        maps = '',
        open,
        t,
        setOpen,
    } = props;
    const styles = useStyles();
    const headerConfig = {
        headerTitle: t('customer:address:addTitle'),
        header: 'relative',
        headerBackIcon: 'close',
    };

    const [mapPosition, setMapPosition] = useState({
        lat: -6.197361,
        lng: 106.774535,
    });

    const displayLocationInfo = (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        // console.log(lng, lat);
        setMapPosition({
            lat,
            lng,
        });
    };

    const handleDragPosition = (value) => {
        setMapPosition(value);
    };

    const AddressSchema = Yup.object().shape({
        firstName: Yup.string().required(t('validate:firstName:required')),
        lastName: Yup.string().required(t('validate:lastName:required')),
        phoneNumber: Yup.string()
            .required(t('validate:phoneNumber:required'))
            .matches(regexPhone, t('validate:phoneNumber:wrong')),
        street: Yup.string()
            .required(t('validate:street:required'))
            .min(10, t('validate:street:wrong')),
        posCode: Yup.string()
            .required(t('validate:postal:required'))
            .min(3, t('validate:postal:wrong'))
            .max(20, t('validate:postal:wrong')),
        country: Yup.string().required(t('validate:country:required')),
        state: Yup.string().required(t('validate:state:required')),
        city: Yup.string().required(t('validate:city:required')),
    });

    const formik = useFormik({
        initialValues: {
            firstName: firstName || '',
            lastName: lastName || '',
            phoneNumber: phoneNumber || '',
            street: street || '',
            country: country || '',
            state: state || '',
            city: city || '',
            posCode: posCode || '',
            maps: maps || '',
            defaultBilling: false,
            defaultShipping: false,
        },
        validationSchema: AddressSchema,
        onSubmit: () => {
            setOpen();
        },
    });

    useEffect(() => {
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
    }, []);
    let dataCountry = [];
    const { loading, data, error } = getCountries();
    if (error) console.log(error);
    if (data) dataCountry = data.countries;
    return (
        <Dialog
            fullScreen
            open={open}
            className={[styles.address_drawer].join(' ')}
        >
            <div style={{ width: '100%' }}>
                <Header
                    pageConfig={headerConfig}
                    LeftComponent={{
                        onClick: setOpen,
                    }}
                />
                <Box className={[styles.address_form].join(' ')}>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.firstName && formik.errors.firstName)}
                            errorMessage={
                                (formik.touched.firstName && formik.errors.firstName) || null
                            }
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.lastName && formik.errors.lastName)}
                            errorMessage={
                                (formik.touched.lastName && formik.errors.lastName) || null
                            }
                        />
                        <TextField
                            label="Street Address"
                            name="street"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.street && formik.errors.street)}
                            errorMessage={
                                (formik.touched.street && formik.errors.street) || null
                            }
                        />
                        <Select
                            label="Country"
                            name="country"
                            loading={loading}
                            data={dataCountry}
                            graphql={getCountries}
                            initialOption={{
                                value: 'id',
                                label: 'full_name_locale',
                            }}
                            error={!!(formik.touched.country && formik.errors.country)}
                            errorMessage={
                                (formik.touched.country && formik.errors.country) || null
                            }
                        />
                        <TextField
                            label="State/Province"
                            name="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.state && formik.errors.state)}
                            errorMessage={
                                (formik.touched.state && formik.errors.state) || null
                            }
                        />
                        <TextField
                            label="City"
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.city && formik.errors.city)}
                            errorMessage={(formik.touched.city && formik.errors.city) || null}
                        />
                        <TextField
                            label="Postal Code"
                            name="posCode"
                            value={formik.values.posCode}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.posCode && formik.errors.posCode)}
                            errorMessage={
                                (formik.touched.posCode && formik.errors.posCode) || null
                            }
                        />
                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            error={
                                !!(formik.touched.phoneNumber && formik.errors.phoneNumber)
                            }
                            errorMessage={
                                (formik.touched.phoneNumber && formik.errors.phoneNumber) || null
                            }
                        />
                        <Box className={styles.boxMap}>
                            <IcubeMaps
                                height="230px"
                                mapPosition={mapPosition}
                                dragMarkerDone={handleDragPosition}
                            />
                        </Box>

                        <FormControlLabel
                            value={formik.values.defaultBilling}
                            onChange={formik.handleChange}
                            name="defaultBilling"
                            control={<Checkbox name="newslater" color="primary" size="small" />}
                            label={(
                                <Typography variant="p" letter="capitalize" className="row center">
                                    {t('customer:address:useBilling')}
                                </Typography>
                            )}
                        />

                        <FormControlLabel
                            value={formik.values.defaultShipping}
                            onChange={formik.handleChange}
                            name="defaultShipping"
                            control={<Checkbox name="newslater" color="primary" size="small" />}
                            label={(
                                <Typography variant="p" letter="capitalize" className="row center">
                                    {t('customer:address:useShipping')}
                                </Typography>
                            )}
                        />

                        <Button className={styles.addBtn} fullWidth type="submit">
                            <Typography variant="title" type="regular" letter="capitalize">
                                {t('common:button:save')}
                            </Typography>
                        </Button>
                    </form>
                </Box>
            </div>
        </Dialog>
    );
};

export default AddAddressDialog;
