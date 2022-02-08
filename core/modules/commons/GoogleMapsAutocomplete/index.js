/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
import {
    compose,
    withProps,
    withHandlers,
    withStateHandlers,
    lifecycle,
} from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from 'react-google-maps';
import CustomTextField from '@common_textfield';
import { useTranslation } from '@i18n';
import { useState, useEffect } from 'react';

const {
    StandaloneSearchBox,
} = require('react-google-maps/lib/components/places/StandaloneSearchBox');

const IcubeMapsAutocomplete = compose(
    withProps((props) => ({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${props.gmapKey}&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: props.containerElement || <div style={{ height: '210px' }} />,
        mapElement: <div style={{ height: '100%' }} />,
        isMarkerShown: true,
    })),
    withHandlers({
        handleDragEnd: ({ dragMarkerDone }) => (event) => {
            const newPosition = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };
            dragMarkerDone(newPosition);
        },
    }),
    withStateHandlers((props) => {
        const {
            infoBoxDefaultOpen, markers,
        } = props;
        const isOpen = {};

        if (infoBoxDefaultOpen && markers.length > 0) {
            markers.forEach((_, index) => {
                isOpen[index] = true;
            });
        }

        return { isOpen };
    }, {
        onToggleOpen: ({ isOpen }) => (id) => ({
            isOpen: {
                ...isOpen,
                [id]: typeof isOpen[id] === 'undefined' ? true : !isOpen[id],
            },
        }),
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};

            this.setState({
                places: [],
                bounds: null,
                onMapMounted: (ref) => {
                    refs.map = ref;
                },
                onSearchBoxMounted: (ref) => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const { location } = refs.searchBox.getPlaces()[0].geometry;
                    this.props.dragMarkerDone({
                        lat: location.lat(),
                        lng: location.lng(),
                    });
                },
            });
        },
    }),
    withScriptjs,
    withGoogleMap,
)((props) => {
    const {
        searchBox = true,
        markers = [],
        defaultZoom = 17,
        defaultOptions,
        center,
        infoBoxStyle,
        formik = false,
    } = props;
    const setZeroIfEmpty = (value) => {
        const emptyValues = [undefined, null, '', 'undefined', 'null'];
        return emptyValues.includes(value) ? 0 : Number(value);
    };
    const mapPosition = {
        lat: setZeroIfEmpty(props.mapPosition && props.mapPosition.lat),
        lng: setZeroIfEmpty(props.mapPosition && props.mapPosition.lng),
    };
    const { t } = useTranslation(['common']);
    // let mapsRes = {
    //     lat: setZeroIfEmpty(props.mapPosition && props.mapPosition.lat),
    //     lng: setZeroIfEmpty(props.mapPosition && props.mapPosition.lng),
    // };

    const [stateBounds, setStateBounds] = useState({});

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
                            const { location } = responseData.results[0].geometry;
                            // mapsRes = {
                            //     lat: parseFloat(location.lat),
                            //     lng: parseFloat(location.lng),
                            // };
                            setStateBounds({
                                lat: parseFloat(location.lat),
                                lng: parseFloat(location.lng),
                            });
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        }
    }, [formik.values.village, formik.values.district, formik.values.city, formik.values.region]);

    return (
        <>
            <GoogleMap
                ref={props.onMapMounted}
                bounds={props.bounds}
                defaultZoom={defaultZoom}
                defaultCenter={mapPosition}
                defaultOptions={{ ...defaultOptions }}
                center={center || mapPosition}
            >
                {searchBox && (
                    <div data-standalone-searchbox="" style={{ marginTop: '-295px' }}>
                        <StandaloneSearchBox
                            ref={props.onSearchBoxMounted}
                            bounds={new google.maps.LatLngBounds(
                                new google.maps.LatLng(parseFloat(stateBounds.lat !== undefined ? stateBounds.lat : mapPosition.lat),
                                    parseFloat(stateBounds.lng !== undefined ? stateBounds.lng : mapPosition.lng)),
                                new google.maps.LatLng(parseFloat(stateBounds.lat !== undefined ? stateBounds.lat : mapPosition.lat),
                                    parseFloat(stateBounds.lng !== undefined ? stateBounds.lng : mapPosition.lng)),
                            )}
                            defaultBounds={new google.maps.LatLngBounds(
                                new google.maps.LatLng(parseFloat(stateBounds.lat !== undefined ? stateBounds.lat : mapPosition.lat),
                                    parseFloat(stateBounds.lng !== undefined ? stateBounds.lng : mapPosition.lng)),
                                new google.maps.LatLng(parseFloat(stateBounds.lat !== undefined ? stateBounds.lat : mapPosition.lat),
                                    parseFloat(stateBounds.lng !== undefined ? stateBounds.lng : mapPosition.lng)),
                            )}
                            onPlacesChanged={props.onPlacesChanged}
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
                        </StandaloneSearchBox>
                    </div>
                )}
                {props.isMarkerShown
                    && (markers && markers.length > 0)
                    ? markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
                            onClick={() => props.onToggleOpen(index)}
                            icon={marker.image ? `${props.secureUrl}${marker.image}` : ''}
                        >
                            {props.isOpen[index] && (
                                <InfoWindow onCloseClick={props.onToggleOpen}>
                                    <div style={{ ...infoBoxStyle }}>
                                        {marker.info}
                                    </div>
                                </InfoWindow>
                            )}
                        </Marker>
                    ))
                    : (
                        <Marker
                            draggable
                            onDragEnd={(event) => props.handleDragEnd(event)}
                            position={mapPosition}
                        />
                    )}
            </GoogleMap>
        </>
    );
});

export default IcubeMapsAutocomplete;
