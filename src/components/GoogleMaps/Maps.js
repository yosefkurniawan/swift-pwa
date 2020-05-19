/* eslint-disable import/no-extraneous-dependencies */
import {
    compose,
    withProps,
    withHandlers,
    lifecycle,
} from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import { useTranslation } from '@i18n';
import Cookies from 'js-cookie';
import { storeConfigNameCokie } from '@config';

const {
    StandaloneSearchBox,
} = require('react-google-maps/lib/components/places/StandaloneSearchBox');

const gmapKey = (Cookies.getJSON(storeConfigNameCokie) || {}).icube_pinlocation_gmap_key;

const IcubeMaps = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${gmapKey}&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '210px' }} />,
        mapElement: <div style={{ height: '100%' }} />,
        isMarkerShown: true,
    }),
    withHandlers({
        handleDragEnd: ({ dragMarkerDone }) => (event) => {
            const newPosition = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };
            dragMarkerDone(newPosition);
        },
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};

            this.setState({
                places: [],
                onSearchBoxMounted: (ref) => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const { location } = refs.searchBox.getPlaces()[0].geometry;
                    // unconfirmed deletion, delete line below when it's confirmed unused codes
                    // this.props.getLocation(refs.searchBox.getPlaces());
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
    const { mapPosition } = props;
    const { t } = useTranslation(['common']);
    return (
        <>
            <GoogleMap
                defaultZoom={17}
                defaultCenter={mapPosition}
                center={mapPosition}
            >
                {props.isMarkerShown && (
                    <Marker
                        draggable
                        onDragEnd={(event) => props.handleDragEnd(event)}
                        position={mapPosition}
                    />
                )}
            </GoogleMap>
            <div data-standalone-searchbox="">
                <StandaloneSearchBox
                    ref={props.onSearchBoxMounted}
                    bounds={props.bounds}
                    onPlacesChanged={props.onPlacesChanged}
                >
                    <TextField
                        fullWidth
                        placeholder={t('common:search:location')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="secondary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </StandaloneSearchBox>
            </div>
        </>
    );
});

export default IcubeMaps;
