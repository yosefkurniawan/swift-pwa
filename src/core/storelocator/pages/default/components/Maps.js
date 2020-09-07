/* eslint-disable import/no-extraneous-dependencies */
import {
    compose,
    withProps,
    lifecycle,
} from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';
// import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import TextField from '@material-ui/core/TextField';
// import SearchIcon from '@material-ui/icons/SearchOutlined';
// import { useTranslation } from '@i18n';

const StoreLocatorMaps = compose(
    withProps((props) => ({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${props.gmapKey}&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '100%', minHeight: '250px', padding: '0 12px' }} />,
        mapElement: <div style={{ height: '100%' }} />,
        isMarkerShown: true,
    })),
    lifecycle({
        componentWillMount() {
            // const refs = {};

            // this.setState({
            //     places: [],
            //     onSearchBoxMounted: (ref) => {
            //         refs.searchBox = ref;
            //     },
            //     onPlacesChanged: () => {
            //         const { location } = refs.searchBox.getPlaces()[0].geometry;
            //         // unconfirmed deletion, delete line below when it's confirmed unused codes
            //         // this.props.getLocation(refs.searchBox.getPlaces());
            //         this.props.dragMarkerDone({
            //             lat: location.lat(),
            //             lng: location.lng(),
            //         });
            //     },
            // });
        },
    }),
    withScriptjs,
    withGoogleMap,
)((props) => {
    // const { t } = useTranslation(['common']);
    const setZeroIfEmpty = (value) => {
        const emptyValues = [undefined, null, '', 'undefined', 'null'];
        return emptyValues.includes(value) ? 0 : Number(value);
    };
    const mapLatLng = (obj) => ({
        lat: setZeroIfEmpty(obj && obj.lat),
        lng: setZeroIfEmpty(obj && obj.lng),
    });
    const centerPosition = mapLatLng(props.centerPosition);
    const mapPositions = props.mapPositions.map((position) => mapLatLng(position));

    return (
        <>
            <GoogleMap
                defaultZoom={15}
                defaultCenter={centerPosition}
                center={centerPosition}
            >
                {props.isMarkerShown && mapPositions.map((position) => (
                    <Marker
                        position={position}
                    />
                ))}
            </GoogleMap>
            {/* <div data-standalone-searchbox="">
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
            </div> */}
        </>
    );
});

export default StoreLocatorMaps;
