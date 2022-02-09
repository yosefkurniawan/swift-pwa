/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import {
    GoogleMap,
    Autocomplete,
    Marker,
    useJsApiLoader,
} from '@react-google-maps/api';
import { useTranslation } from '@i18n';
import CustomTextField from '@common_textfield';

const containerStyle = {
    width: '100%',
    height: '230px',
};

const refs = {
    marker: null,
    autoComplete: null,
    searchBox: null,
};

const autoCompleteLoad = (ref) => {
    refs.autoComplete = ref;
};

const markerLoad = (ref) => {
    refs.marker = ref;
};

const IcubeMapsAutocomplete = (props) => {
    const {
        gmapKey,
        formik,
        dragMarkerDone,
        defaultZoom = 17,
    } = props;
    const { t } = useTranslation(['common']);

    const [libraries] = useState(['places', 'geometry', 'drawing']);
    const [stateBounds, setStateBounds] = useState({
        northeast: {},
        southwest: {},
    });

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: gmapKey,
        libraries,
    });

    const setZeroIfEmpty = (value) => {
        const emptyValues = [undefined, null, '', 'undefined', 'null'];
        return emptyValues.includes(value) ? 0 : Number(value);
    };

    const mapPosition = {
        lat: setZeroIfEmpty(props.mapPosition && props.mapPosition.lat),
        lng: setZeroIfEmpty(props.mapPosition && props.mapPosition.lng),
    };

    const handleDragEnd = (event) => {
        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        dragMarkerDone(newPosition);
    };

    const onPlaceChanged = () => {
        if (refs.autoComplete !== null) {
            const { location } = refs.autoComplete.getPlace().geometry;
            dragMarkerDone({
                lat: location.lat(),
                lng: location.lng(),
            });
        }
    };

    useEffect(() => {
        if (formik !== false) {
            if ((formik.values.village !== '' && formik.values.village !== undefined && formik.values.village !== null)
                && (formik.values.district !== '' && formik.values.district !== undefined && formik.values.district !== null)
                && (formik.values.city !== '' && formik.values.city !== undefined && formik.values.city !== null)
                && (formik.values.region !== '' && formik.values.region !== undefined && formik.values.region !== null)) {
                // eslint-disable-next-line max-len
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formik.values.village.label}+${formik.values.district.label}+${formik.values.city.label}+${formik.values.region.name}&language=id&key=AIzaSyAsE5tvjrOes4cyL0jpUEtLKMVY65rAwgQ`)
                    .then((response) => response.json())
                    .then((responseData) => {
                        if (responseData.results.length > 0) {
                            const { bounds } = responseData.results[0].geometry;
                            setStateBounds({
                                northeast: {
                                    lat: parseFloat(bounds.northeast.lat),
                                    lng: parseFloat(bounds.northeast.lng),
                                },
                                southwest: {
                                    lat: parseFloat(bounds.southwest.lat),
                                    lng: parseFloat(bounds.southwest.lng),
                                },
                            });
                        }
                    })
                    .catch((e) => {
                        // eslint-disable-next-line no-console
                        console.log(e);
                    });
            }
        }
    }, [formik.values.village, formik.values.district, formik.values.city, formik.values.region]);

    // eslint-disable-next-line arrow-body-style
    const renderMap = () => {
        return (
            <>
                <Autocomplete
                    onLoad={autoCompleteLoad}
                    onPlaceChanged={onPlaceChanged}
                    options={{
                        // eslint-disable-next-line no-undef
                        bounds: new google.maps.LatLngBounds(
                            // eslint-disable-next-line no-undef
                            new google.maps.LatLng(parseFloat(stateBounds.southwest.lat !== undefined ? stateBounds.southwest.lat : mapPosition.lat),
                                parseFloat(stateBounds.southwest.lng !== undefined ? stateBounds.southwest.lng : mapPosition.lng)),
                            // eslint-disable-next-line no-undef
                            new google.maps.LatLng(parseFloat(stateBounds.northeast.lat !== undefined ? stateBounds.northeast.lat : mapPosition.lat),
                                parseFloat(stateBounds.northeast.lng !== undefined ? stateBounds.northeast.lng : mapPosition.lng)),
                        ),
                        strictBounds: true,
                    }}
                >
                    <CustomTextField
                        label={t('common:form:addressDetail')}
                        placeholder={t('common:search:addressDetail')}
                        autoComplete="new-password"
                        name="street"
                        value={formik.values.street}
                        onChange={(e) => { formik.handleChange(e); }}
                        error={!!(formik.touched.street && formik.errors.street)}
                        errorMessage={(formik.touched.street && formik.errors.street) || null}
                    />
                </Autocomplete>
                <GoogleMap
                    id="searchbox-example"
                    mapContainerStyle={containerStyle}
                    center={mapPosition}
                    zoom={defaultZoom}
                >
                    <Marker
                        onLoad={markerLoad}
                        position={mapPosition}
                        onDragEnd={(event) => handleDragEnd(event)}
                        draggable
                    />
                </GoogleMap>
            </>
        );
    };

    if (loadError) {
        return <div>{t('common:form:mapError')}</div>;
    }

    return isLoaded ? renderMap() : <div>{t('common:form:mapLoading')}</div>;
};

export default IcubeMapsAutocomplete;
