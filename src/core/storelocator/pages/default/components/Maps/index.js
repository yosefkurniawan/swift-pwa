/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import { compose, withProps } from 'recompose';
import {
    withScriptjs, withGoogleMap, GoogleMap, Marker, Circle,
} from 'react-google-maps';
import Slider from '@material-ui/core/Slider';
import SearchBox from './SearchBox';

const SliderRadius = ({ radius, setRadius }) => (
    <div style={{ padding: 17 }}>
        <Slider
            value={radius}
            onChange={(e, newValue) => setRadius(newValue)}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            marks={[
                { value: 1000, label: '1 Km' },
                { value: 100 * 1000, label: '100 Km' },
            ]}
            scale={(x) => Math.round(x / 1000)}
            step={1000}
            min={1000}
            max={100 * 1000}
        />
    </div>
);

const StoreLocatorMaps = compose(
    withProps((props) => ({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${props.gmapKey}&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '100%', minHeight: '250px', paddingBottom: '12px' }} />,
        mapElement: <div style={{ height: '100%' }} />,
        isMarkerShown: true,
    })),
    withScriptjs,
    withGoogleMap,
)((props) => {
    const mapLatLng = (obj) => {
        const setZeroIfEmpty = (value) => {
            const emptyValues = [undefined, null, '', 'undefined', 'null'];
            return emptyValues.includes(value) ? 0 : Number(value);
        };
        return { lat: setZeroIfEmpty(obj && obj.lat), lng: setZeroIfEmpty(obj && obj.lng) };
    };
    const [radius, setRadius] = React.useState(15000);
    const [zoom, setZoom] = React.useState(1);
    const [centerPosition, setCenterPosition] = React.useState(mapLatLng(props.centerPosition));
    const searchBox = React.useRef();

    React.useEffect(() => {
        setZoom(24 - Math.log(radius * 0.621371) / Math.LN2);
    }, [radius]);

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

    const handleSearch = () => {
        const { location } = searchBox.current.getPlaces()[0].geometry;
        setCenterPosition({ lat: location.lat(), lng: location.lng() });
    };

    return (
        <>
            <div className="row" style={{ padding: '12px 0' }}>
                <div className="col-sm-6">
                    <SliderRadius radius={radius} setRadius={setRadius} />
                </div>
                <div className="col-sm-6">
                    <SearchBox ref={searchBox} handleSearch={handleSearch} />
                </div>
            </div>
            <div>
                <GoogleMap
                    defaultZoom={zoom}
                    zoom={zoom}
                    defaultCenter={centerPosition}
                    center={centerPosition}
                >
                    <Circle
                        center={centerPosition}
                        radius={radius}
                        options={{ fillColor: 'grey', strokeColor: 'grey' }}
                    />
                    <Circle
                        center={centerPosition}
                        radius={radius / 50}
                        options={{ fillColor: 'black', fillOpacity: 0.5, strokeOpacity: 0 }}
                    />
                    {props.isMarkerShown && mapPositions.map((position, i) => (
                        getDistance(position, centerPosition) <= radius
                            ? <Marker position={position} key={i} />
                            : null
                    ))}
                </GoogleMap>
            </div>
        </>
    );
});

export default StoreLocatorMaps;
