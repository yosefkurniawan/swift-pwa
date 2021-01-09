/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { regexPhone } from '@helper_regex';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { groupingCity, groupingSubCity } from '@helpers/city';
import { modules } from '@config';
import { getCityByRegionId, getCountries as getAllCountries, getRegions } from '../../services/graphql';

const AddressFormDialog = (props) => {
    const {
        firstname = '',
        lastname = '',
        street = '',
        postcode = '',
        country = {
            id: 'ID',
            full_name_locale: 'Indonesia',
        },
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
        latitude,
        longitude,
        pageTitle,
        disableDefaultAddress = false,
        Content,
        storeConfig,
    } = props;

    const gmapKey = (storeConfig || {}).icube_pinlocation_gmap_key;

    const [getCountries, responCountries] = getAllCountries();
    const [getRegion, responRegion] = getRegions();
    const [addressState, setAddressState] = useState({
        countries: null,
        dropdown: {
            countries: null,
            region: null,
            city: null,
            district: null,
            village: null,
        },
        value: {
            country: { id: '', label: '' },
            region: { id: '', label: '' },
            city: { id: '', label: '' },
        },
    });

    const [isFromUseEffect, setFromUseEffect] = useState(false);

    const [enableSplitCity, setEnableSplitCity] = React.useState(
        country === 'ID' && modules.customer.plugin.address.splitCity,
    );

    const getCityByLabel = (label, dataCity = null) => {
        const data = dataCity || addressState.dropdown.city;
        return data.find((item) => item.label === label) ? data.find((item) => item.label === label) : null;
    };

    const splitCityValue = (cityValue) => cityValue.split(', ');

    const [mapPosition, setMapPosition] = useState({
        lat: latitude || '-6.197361',
        lng: longitude || '106.774535',
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

    const ValidationAddress = {
        firstname: Yup.string().required(t('validate:firstName:required')),
        lastname: Yup.string().required(t('validate:lastName:required')),
        telephone: Yup.string().required(t('validate:telephone:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        street: Yup.string().required(t('validate:street:required')),
        postcode: Yup.string().required(t('validate:postal:required')).min(3, t('validate:postal:wrong')).max(20, t('validate:postal:wrong')),
        country: Yup.string().nullable().required(t('validate:country:required')),
        region: Yup.string().nullable().required(t('validate:state:required')),
        city: Yup.string().nullable().required(t('validate:city:required')),
    };

    const InitialValue = {
        firstname: firstname || '',
        lastname: lastname || '',
        telephone: telephone || '',
        street: street || '',
        country: {
            id: 'ID',
            full_name_locale: 'Indonesia',
        },
        region: '',
        city: '',
        postcode: postcode || '',
        maps: maps || '',
        defaultShippingBilling: defaultShipping || defaultBilling,
        regionCode: '',
        regionId: '',
    };

    // add initial value if split city enabled
    if (enableSplitCity) {
        ValidationAddress.district = Yup.string().nullable().required('Kecamatan');
        ValidationAddress.village = Yup.string().nullable().required('Kelurahan');

        InitialValue.district = '';
        InitialValue.village = '';
    }

    const AddressSchema = Yup.object().shape(ValidationAddress);

    const formik = useFormik({
        initialValues: InitialValue,
        validationSchema: AddressSchema,
        onSubmit: async (values) => {
            const data = {
                ...values,
                defaultBilling: values.defaultShippingBilling,
                defaultShipping: values.defaultShippingBilling,
                countryCode: values.country.id,
                region: values.region && values.region.code ? values.region.code : values.region,
                regionCode: values.region && values.region.code ? values.region.code : null,
                regionId: values.region && values.region.code ? values.region.region_id : null,
                addressId,
                latitude: String(mapPosition.lat),
                longitude: String(mapPosition.lng),
            };

            if (enableSplitCity) {
                data.city = values.village && values.village.city ? values.village.city : values.id;
            } else {
                data.city = values.city && values.city.label ? values.city.label : values.city;
            }

            const type = addressId ? 'update' : 'add';

            // remove split values
            delete data.district;
            delete data.village;
            if (onSubmitAddress) {
                onSubmitAddress(data, type);
            }
        },
    });

    // togle enableSplitCity, set true when countryId === 'ID' & splitCity config === true
    React.useEffect(() => {
        const countryId = formik.values.country && formik.values.country.id;
        setEnableSplitCity(countryId === 'ID' && modules.customer.plugin.address.splitCity);
    }, [formik.values.country]);

    const [getCities, responCities] = getCityByRegionId({});
    React.useMemo(() => {
        if (open) {
            formik.setFieldValue('firstname', firstname);
            formik.setFieldValue('lastname', lastname);
            formik.setFieldValue('street', street);
            formik.setFieldValue('telephone', telephone);
            formik.setFieldValue('postcode', postcode);

            formik.setFieldValue('country', country);
            formik.setFieldValue('region', region);

            if (country && country.id && addressId) {
                getRegion({
                    variables: {
                        country_id: country.id,
                    },
                });
            }

            // only set current location for add mode
            if (typeof window !== 'undefined' && navigator && navigator.geolocation && !addressId) {
                return navigator.geolocation.getCurrentPosition(displayLocationInfo);
            }

            // update map position after edit data
            if (open && latitude && longitude) {
                setMapPosition({
                    lat: latitude,
                    lng: longitude,
                });
            }
        }
    }, [open]);

    useEffect(() => {
        if (responRegion.data && responRegion.data.getRegions
            && responRegion.data.getRegions.item && responRegion.data.getRegions.item.length > 0) {
            const state = { ...addressState };
            if (region && typeof region === 'string') {
                const selectRegion = responRegion.data.getRegions.item.filter((item) => item.name === region);
                if (selectRegion && selectRegion.length > 0) formik.setFieldValue('region', selectRegion[0]);
            }
            state.dropdown.region = responRegion.data.getRegions.item;
            setAddressState(state);
        }
    }, [responRegion.data]);

    useEffect(() => {
        if (formik.values.region && formik.values.region.region_id) {
            getCities({ variables: { regionId: formik.values.region.region_id } });
        }
        if (enableSplitCity) {
            const state = { ...addressState };
            state.dropdown.district = null;
            state.dropdown.village = null;
            setAddressState(state);
        }
    }, [formik.values.region]);

    // set city and grouping
    useEffect(() => {
        if (responCities && responCities.data && !responCities.loading && !responCities.error && responCities.data.getCityByRegionId) {
            const state = { ...addressState };
            const { data } = responCities;
            if (data.getCityByRegionId.item.length !== 0) {
                if (enableSplitCity) {
                    state.dropdown.city = groupingCity(data.getCityByRegionId.item);
                    state.dropdown.district = null;
                    state.dropdown.village = null;
                    // get default value by split city
                    if (city && !formik.values.city) {
                        const defaultValue = splitCityValue(city);
                        formik.setFieldValue('city', getCityByLabel(defaultValue[0], state.dropdown.city));
                    }
                } else {
                    state.dropdown.city = data.getCityByRegionId.item.map((item) => ({ ...item, id: item.id, label: item.city }));
                    formik.setFieldValue('city', getCityByLabel(city, state.dropdown.city));
                }
            } else {
                state.dropdown.city = null;
                formik.setFieldValue('city', null);
                if (isFromUseEffect) {
                    formik.setFieldValue('city', city);
                    setFromUseEffect(false);
                }
            }

            setAddressState(state);
        }
    }, [responCities]);

    // get kecamatan if city change
    React.useMemo(() => {
        if (formik.values.city) {
            if (enableSplitCity) {
                const { data } = responCities;
                const district = data && data.getCityByRegionId
                    ? groupingSubCity(formik.values.city.label, 'district', data.getCityByRegionId.item)
                    : null;
                const state = { ...addressState };
                state.dropdown.district = district;
                state.dropdown.village = null;
                if (city && !formik.values.district) {
                    const defaultValue = splitCityValue(city);
                    formik.setFieldValue('district', getCityByLabel(defaultValue[1], state.dropdown.district));
                } else {
                    // reset village and district if change city
                    formik.setFieldValue('district', '');
                    formik.setFieldValue('village', '');
                    formik.setFieldValue('postcode', '');
                }
                setAddressState(state);
            } else {
                formik.setFieldValue('postcode', formik.values.city.postcode || postcode);
            }
        }
    }, [formik.values.city]);

    // get kelurahan if kecamatan change
    React.useMemo(() => {
        if (formik.values.district) {
            const { data } = responCities;
            const village = groupingSubCity(formik.values.district.label, 'village', data.getCityByRegionId.item);
            const state = { ...addressState };
            state.dropdown.village = village;
            if (city && !formik.values.village) {
                const defaultValue = splitCityValue(city);
                formik.setFieldValue('village', getCityByLabel(defaultValue[2], state.dropdown.village));
            } else {
                // reset village if district change
                formik.setFieldValue('village', '');
                formik.setFieldValue('postcode', '');
            }
            setAddressState(state);
        }
    }, [formik.values.district]);

    React.useMemo(() => {
        if (formik.values.village) {
            formik.setFieldValue('postcode', formik.values.village.postcode);
        }
    }, [formik.values.village]);

    // clear child location value when clear parent location
    // example: clear country => clear region
    React.useEffect(() => {
        if (!formik.values.country) formik.setFieldValue('region', '');
    }, [formik.values.country]);

    React.useEffect(() => {
        if (!formik.values.region) formik.setFieldValue('city', '');
    }, [formik.values.region]);

    React.useEffect(() => {
        if (!formik.values.city) formik.setFieldValue('district', '');
    }, [formik.values.city]);

    React.useEffect(() => {
        if (!formik.values.district) formik.setFieldValue('village', '');
    }, [formik.values.district]);

    React.useEffect(() => {
        if (!formik.values.village) formik.setFieldValue('postcode', '');
    }, [formik.values.village]);

    return (
        <Content
            t={t}
            open={open}
            setOpen={setOpen}
            pageTitle={pageTitle}
            formik={formik}
            addressState={addressState}
            setFromUseEffect={setFromUseEffect}
            getCities={getCities}
            responCities={responCities}
            setAddressState={setAddressState}
            mapPosition={mapPosition}
            handleDragPosition={handleDragPosition}
            disableDefaultAddress={disableDefaultAddress}
            loading={loading}
            success={success}
            gmapKey={gmapKey}
            enableSplitCity={enableSplitCity}
            getCountries={getCountries}
            responCountries={responCountries}
            getRegion={getRegion}
            responRegion={responRegion}
        />
    );
};

export default AddressFormDialog;
