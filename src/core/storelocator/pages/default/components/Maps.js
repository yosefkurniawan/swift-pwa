/* eslint-disable no-use-before-define */
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
    Circle,
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

            this.setState({
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
            });
        },
    }),
    withScriptjs,
    withGoogleMap,
)((props) => {
    // const { t } = useTranslation(['common']);
    const [radius] = React.useState(12399);
    const [zoom, setZoom] = React.useState(1);

    React.useEffect(() => {
        setZoom(24 - Math.log(radius * 0.621371) / Math.LN2);
    }, [radius]);

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

    const getDistance = (p1, p2) => {
        const rad = (x) => (x * Math.PI) / 180;
        const R = 6378137; // Earth’s mean radius in meter
        const dLat = rad(p2.lat - p1.lat);
        const dLong = rad(p2.lng - p1.lng);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat))
            * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d; // returns the distance in meter
    };

    return (
        <>
            <GoogleMap
                defaultZoom={zoom}
                zoom={zoom}
                defaultCenter={centerPosition}
                center={centerPosition}
            >
                <Circle
                    strokeColor="red"
                    center={centerPosition}
                    defaultRadius={0}
                    radius={radius}
                />
                {props.isMarkerShown && mapPositions.map((position) => (
                    getDistance(position, centerPosition) <= radius
                        ? <Marker position={position} />
                        : null
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
