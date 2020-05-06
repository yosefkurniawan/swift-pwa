/* eslint-disable consistent-return */
import Button from '@components/Button';
import CustomTextField from '@components/Forms/TextField';
import IcubeMaps from '@components/GoogleMaps/Maps';
import Header from '@components/Header';
import Typography from '@components/Typography';
import { regexPhone } from '@helpers/regex';
import {
    Box, Checkbox, CircularProgress, Dialog, FormControlLabel, TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useFormik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { getCityByRegionId, getCountries as getAllCountries } from './services/graphql';
import useStyles from './style';

const AddressFormDialog = (props) => {
    const {
        firstname = '',
        lastname = '',
        street = '',
        postcode = '',
        country = null,
        region = null,
        city = null,
        telephone = '',
        maps = '',
        open,
        t,
        onSubmitAddress,
        loading = false,
        success = false,
        defaultShipping = false,
        defaultBilling = false,
        addressId = null,
        setOpen,
        customAttributes,
        pageTitle = 'addTitle',
    } = props;

    const styles = useStyles();
    const headerConfig = {
        headerTitle: t(`customer:address:${pageTitle}`),
        header: 'relative',
        headerBackIcon: 'close',
    };

    const [getCountries, gqlCountries] = getAllCountries();
    const [addressState, setAddressState] = useState({
        countries: null,
        dropdown: {
            countries: null,
            region: null,
            city: null,
        },
        value: {
            country: { id: '', label: '' },
            region: { id: '', label: '' },
            city: { id: '', label: '' },
        },
    });

    const [isFromUseEffect, setFromUseEffect] = useState(false);

    const addBtn = clsx({
        [styles.addBtnSuccess]: success,
        [styles.addBtn]: !success,
    });

    const getRegionByLabel = (label, dataRegion = null) => {
        const data = dataRegion || addressState.dropdown.region;
        return data.find((item) => item.label === label) ? data.find((item) => item.label === label) : null;
    };

    const getRegionByCountry = (dataCountry, countries = null) => {
        let data = countries || addressState.countries;
        data = data.find((item) => item.id === dataCountry);

        if (data) {
            if (data.available_regions) {
                return data.available_regions.map((item) => ({
                    ...item,
                    label: item.name,
                }));
            }
        }

        return null;
    };

    const getCountryByCode = (code, countries = null) => {
        let data = countries || addressState.dropdown.countries;
        data = data.find((item) => item.id === code);
        return data || null;
    };

    const getCityByLabel = (label, dataCity = null) => {
        const data = dataCity || addressState.dropdown.city;
        return data.find((item) => item.label === label) ? data.find((item) => item.label === label) : null;
    };

    const [mapPosition, setMapPosition] = useState({
        lat: customAttributes ? Number((customAttributes.find((el) => el.attribute_code === 'latitude') || {}).value) : -6.197361,
        lng: customAttributes ? Number((customAttributes.find((el) => el.attribute_code === 'longitude') || {}).value) : 106.774535,
    });

    const displayLocationInfo = (position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;

        setMapPosition({
            lat,
            lng,
        });
    };

    const handleDragPosition = (value) => {
        setMapPosition(value);
    };

    const AddressSchema = Yup.object().shape({
        firstname: Yup.string().required(t('validate:firstname:required')),
        lastname: Yup.string().required(t('validate:lastname:required')),
        telephone: Yup.string().required(t('validate:telephone:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        street: Yup.string().required(t('validate:street:required')).min(10, t('validate:street:wrong')),
        postcode: Yup.string().required(t('validate:postcode:required')).min(3, t('validate:postcode:wrong')).max(20, t('validate:postcode:wrong')),
        country: Yup.string().nullable().required(t('validate:country:required')),
        region: Yup.string().nullable().required(t('validate:state:required')),
        city: Yup.string().nullable().required(t('validate:city:required')),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: firstname || '',
            lastname: lastname || '',
            telephone: telephone || '',
            street: street || '',
            country: '',
            region: '',
            city: '',
            postcode: postcode || '',
            maps: maps || '',
            defaultBilling: defaultBilling || false,
            defaultShipping: defaultShipping || false,
            regionCode: '',
            regionId: '',
        },
        validationSchema: AddressSchema,
        onSubmit: async (values) => {
            const data = {
                ...values,
                city: _.isObject(values.city) ? values.city.label : values.city,
                countryCode: values.country.id,
                region: _.isObject(values.region) ? values.region.name : values.region,
                regionCode: _.isObject(values.region) ? values.region.code : null,
                regionId: _.isObject(values.region) ? values.region.id : null,
                addressId,
                customAttributes: [
                    { attribute_code: 'latitude', value: mapPosition.lat },
                    { attribute_code: 'longitude', value: mapPosition.lng },
                ],
            };

            const type = addressId ? 'update' : 'add';

            if (onSubmitAddress) {
                onSubmitAddress(data, type);
            }
        },
    });

    const [getCities] = getCityByRegionId({
        onCompleted: (data) => {
            const state = { ...addressState };

            if (data.getCityByRegionId.item.length !== 0) {
                state.dropdown.city = data.getCityByRegionId.item.map((item) => ({ ...item, id: item.id, label: item.city }));
                formik.setFieldValue('city', getCityByLabel(city, state.dropdown.city));
            } else {
                state.dropdown.city = null;
                formik.setFieldValue('city', null);
                if (isFromUseEffect) {
                    formik.setFieldValue('city', city);
                    setFromUseEffect(false);
                }
            }

            setAddressState(state);
        },
    });

    const getRegionRender = () => {
        if (_.isArray(addressState.dropdown.region) && open) {
            return (
                <Autocomplete
                    options={addressState.dropdown.region}
                    getOptionLabel={(option) => (option.label ? option.label : '')}
                    id="controlled-region"
                    value={_.isEmpty(formik.values.region) ? null : formik.values.region}
                    onClose={() => {
                        formik.setFieldValue('city', null);
                    }}
                    onChange={async (event, newValue) => {
                        formik.setFieldValue('region', newValue);
                        if (newValue) {
                            setFromUseEffect(false);
                            getCities({ variables: { regionId: newValue.id } });
                        }
                    }}
                    renderInput={(params) => (
                        <div
                            style={{
                                marginTop: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            <TextField
                                {...params}
                                name="state"
                                label="State/Province"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onKeyDown={(event) => {
                                    if (event.key !== 'Enter' && event.key !== 'Tab') {
                                        const state = {
                                            ...addressState,
                                        };
                                        state.dropdown.city = null;
                                        setAddressState(state);
                                        formik.setFieldValue('city', null);
                                    }
                                }}
                                error={!!(formik.touched.region && formik.errors.region)}
                            />
                            <Typography variant="p" color={formik.touched.region && formik.errors.region ? 'red' : 'default'}>
                                {formik.touched.region && formik.errors.region}
                            </Typography>
                        </div>
                    )}
                />
            );
        }

        return (
            <CustomTextField
                label="State/Province"
                name="region"
                value={formik.values.region || ''}
                onChange={formik.handleChange}
                error={!!(formik.touched.region && formik.errors.region)}
                errorMessage={(formik.touched.region && formik.errors.region) || null}
            />
        );
    };

    const getCityRender = () => {
        if (_.isArray(addressState.dropdown.city) && open) {
            return (
                <Autocomplete
                    options={addressState.dropdown.city}
                    getOptionLabel={(option) => (option.label ? option.label : '')}
                    id="controlled-city"
                    value={_.isEmpty(formik.values.city) ? null : formik.values.city}
                    onChange={(event, newValue) => {
                        formik.setFieldValue('city', newValue);
                    }}
                    renderInput={(params) => (
                        <div
                            style={{
                                marginTop: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            <TextField
                                {...params}
                                name="city"
                                label="City"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!(formik.touched.city && formik.errors.city)}
                            />
                            <Typography variant="p" color={formik.touched.city && formik.errors.city ? 'red' : 'default'}>
                                {formik.touched.city && formik.errors.city}
                            </Typography>
                        </div>
                    )}
                />
            );
        }

        return (
            <CustomTextField
                label="City"
                name="city"
                value={formik.values.city || ''}
                onChange={formik.handleChange}
                error={!!(formik.touched.city && formik.errors.city)}
                errorMessage={(formik.touched.city && formik.errors.city) || null}
            />
        );
    };

    useEffect(() => {
        const state = { ...addressState };

        formik.setFieldValue('country', country);
        formik.setFieldValue('region', region);

        getCountries();
        if (gqlCountries.data && open) {
            state.countries = gqlCountries.data.countries;
            state.dropdown.countries = state.countries.map((item) => ({
                id: item.id,
                label: item.full_name_locale,
                available_regions: item.available_regions,
            }));

            if (country) {
                state.dropdown.region = getRegionByCountry(country, gqlCountries.data.countries);
                formik.setFieldValue('country', getCountryByCode(country, state.dropdown.countries));
            }
            setAddressState(state);

            if (_.isArray(state.dropdown.region) && !region) {
                const selectedRegion = getRegionByLabel(region);
                formik.setFieldValue('region', selectedRegion);
                if (selectedRegion) {
                    setFromUseEffect(true);
                    getCities({ variables: { regionId: selectedRegion.id } });
                }
            } else {
                formik.setFieldValue('city', city);
            }
        }

        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
    }, [open]);

    return (
        <Dialog fullScreen open={open} className={[styles.address_drawer].join(' ')}>
            <div className={styles.container}>
                <Header
                    pageConfig={headerConfig}
                    LeftComponent={{
                        onClick: () => {
                            formik.resetForm();
                            setOpen();
                        },
                    }}
                />
                <Box className={[styles.address_form].join(' ')}>
                    <form onSubmit={formik.handleSubmit}>
                        <CustomTextField
                            label="First Name"
                            name="firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.firstname && formik.errors.firstname)}
                            errorMessage={(formik.touched.firstname && formik.errors.firstname) || null}
                        />
                        <CustomTextField
                            label="Last Name"
                            name="lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.lastname && formik.errors.lastname)}
                            errorMessage={(formik.touched.lastname && formik.errors.lastname) || null}
                        />
                        <CustomTextField
                            label="Street Address"
                            name="street"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.street && formik.errors.street)}
                            errorMessage={(formik.touched.street && formik.errors.street) || null}
                        />
                        {_.isArray(addressState.dropdown.countries) && open ? (
                            <Autocomplete
                                options={addressState.dropdown.countries}
                                getOptionLabel={(option) => (option.label ? option.label : '')}
                                id="controlled-demo"
                                value={formik.values.country}
                                onClose={() => {
                                    formik.setFieldValue('region', null);
                                    formik.setFieldValue('city', null);
                                }}
                                onChange={(event, newValue) => {
                                    const state = { ...addressState };
                                    state.dropdown.region = newValue ? newValue.available_regions : null;
                                    state.dropdown.region = !state.dropdown.region
                                        || state.dropdown.region.map((item) => ({ ...item, label: item.name }));
                                    state.dropdown.city = null;

                                    setAddressState(state);
                                    formik.setFieldValue('country', newValue);
                                }}
                                renderInput={(params) => (
                                    <div
                                        style={{
                                            marginTop: '10px',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        <TextField
                                            {...params}
                                            name="country"
                                            label="Country"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onKeyDown={(event) => {
                                                if (event.key !== 'Enter' && event.key !== 'Tab') {
                                                    const state = {
                                                        ...addressState,
                                                    };
                                                    state.dropdown.region = null;
                                                    state.dropdown.city = null;
                                                    state.value.region = {
                                                        id: '',
                                                        label: '',
                                                    };
                                                    setAddressState(state);

                                                    formik.setFieldValue('region', null);
                                                    formik.setFieldValue('city', null);
                                                }
                                            }}
                                            error={!!(formik.touched.country && formik.errors.country)}
                                        />
                                        <Typography variant="p" color={formik.touched.country && formik.errors.country ? 'red' : 'default'}>
                                            {formik.touched.country && formik.errors.country}
                                        </Typography>
                                    </div>
                                )}
                            />
                        ) : null}
                        {getRegionRender()}
                        {getCityRender()}
                        <CustomTextField
                            label="Postal Code"
                            name="postcode"
                            value={formik.values.postcode}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.postcode && formik.errors.postcode)}
                            errorMessage={(formik.touched.postcode && formik.errors.postcode) || null}
                        />
                        <CustomTextField
                            label="Phone Number"
                            name="telephone"
                            value={formik.values.telephone}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.telephone && formik.errors.telephone)}
                            errorMessage={(formik.touched.telephone && formik.errors.telephone) || null}
                        />
                        <Box className={styles.boxMap}>
                            <IcubeMaps height="230px" mapPosition={mapPosition} dragMarkerDone={handleDragPosition} />
                        </Box>

                        <FormControlLabel
                            value={formik.values.defaultBilling}
                            checked={formik.values.defaultBilling}
                            onChange={() => formik.setFieldValue('defaultBilling', !formik.values.defaultBilling)}
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
                            checked={formik.values.defaultShipping}
                            onChange={() => formik.setFieldValue('defaultShipping', !formik.values.defaultShipping)}
                            name="defaultShipping"
                            control={<Checkbox name="newslater" color="primary" size="small" />}
                            label={(
                                <Typography variant="p" letter="capitalize" className="row center">
                                    {t('customer:address:useShipping')}
                                </Typography>
                            )}
                        />

                        <div className={styles.wrapper}>
                            <Button className={addBtn} fullWidth type="submit" disabled={loading}>
                                <Typography className={styles.fontWhite} variant="title" type="regular" letter="capitalize">
                                    {t(success ? 'common:button:saved' : 'common:button:save')}
                                </Typography>
                            </Button>
                            {loading && <CircularProgress size={24} className={styles.buttonProgress} />}
                        </div>
                    </form>
                </Box>
            </div>
        </Dialog>
    );
};

export default AddressFormDialog;
