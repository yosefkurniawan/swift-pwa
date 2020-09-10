/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import { compose, withProps } from 'recompose';
import {
    withScriptjs, withGoogleMap, GoogleMap, Marker, Circle,
} from 'react-google-maps';
import Button from '@material-ui/core/Button';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import SearchBox from './SearchBox';
import SliderRadius from './SliderRadius';

const StoreLocatorMaps = compose(
    withProps((props) => ({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${props.gmapKey}&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '100%' }} />,
        mapElement: <div style={{ height: '50vh', marginBottom: 16 }} />,
        isMarkerShown: true,
    })),
    withScriptjs,
    withGoogleMap,
)((props) => {
    // helper
    const mapLatLng = (obj) => {
        const setZeroIfEmpty = (value) => {
            const emptyValues = [undefined, null, '', 'undefined', 'null'];
            return emptyValues.includes(value) ? 0 : Number(value);
        };
        return { ...obj, lat: setZeroIfEmpty(obj && obj.lat), lng: setZeroIfEmpty(obj && obj.lng) };
    };
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

    // state
    const defaultRadius = 15000;
    const [isShowAllStore, setIsShowAllStore] = React.useState(true);
    const [radius, setRadius] = React.useState(defaultRadius);
    const [zoom, setZoom] = React.useState(1);
    const [centerPosition, setCenterPosition] = React.useState(mapLatLng(props.centerPosition));
    const [selectedStore, setSelectedStore] = React.useState();
    const [userPosition] = React.useState(mapLatLng(props.centerPosition));
    const [mapPositions] = React.useState(props.mapPositions.map((position) => mapLatLng(position)));
    const [querySearch, setQuerySearch] = React.useState('');

    // effect
    React.useEffect(() => {
        setCenterPosition(mapLatLng(props.centerPosition));
    }, [props.centerPosition]);
    React.useEffect(() => {
        setZoom(24 - Math.log(radius * 0.621371) / Math.LN2);
    }, [radius]);
    React.useEffect(() => {
        updateStoreList();
    }, [centerPosition, radius]);
    React.useEffect(() => {
        if (selectedStore) {
            setCenterPosition({ lat: selectedStore.lat, lng: selectedStore.lng });
        }
    }, [selectedStore]);

    // ref
    const searchBoxRef = React.useRef();

    // method
    const updateStoreList = () => {
        if (isShowAllStore) {
            props.setStoreList(mapPositions);
        } else {
            props.setStoreList(mapPositions.filter((position) => getDistance(position, centerPosition) <= radius));
        }
    };
    const handleSearch = () => {
        setIsShowAllStore(false);
        const { location } = searchBoxRef.current.getPlaces()[0].geometry;
        setCenterPosition({ lat: location.lat(), lng: location.lng() });
    };
    const handleRadius = (value) => {
        setIsShowAllStore(false);
        setRadius(value);
    };
    const handleReset = () => {
        setSelectedStore(null);
        setIsShowAllStore(true);
        setCenterPosition(userPosition);
        setRadius(radius > defaultRadius ? defaultRadius : radius + 0.1);
        setQuerySearch('');
    };

    return (
        <>
            <div className="row">
                <div className="col-sm-5">
                    <SearchBox ref={searchBoxRef} handleSearch={handleSearch} value={querySearch} setValue={setQuerySearch} />
                </div>
                <div className="col-sm-5">
                    <SliderRadius radius={radius} setRadius={handleRadius} />
                </div>
                <div className="col-sm-2">
                    <Button
                        style={{ width: '100%' }}
                        variant="contained"
                        startIcon={<AutorenewIcon />}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </div>
            </div>
            <GoogleMap
                defaultZoom={zoom}
                zoom={zoom}
                defaultCenter={centerPosition}
                center={centerPosition}
            >
                <Circle
                    center={centerPosition}
                    radius={radius}
                    options={{
                        fillColor: 'grey',
                        strokeColor: 'grey',
                        fillOpacity: isShowAllStore ? 0 : 0.3,
                        strokeOpacity: isShowAllStore ? 0 : 0.8,
                    }}
                />
                <Circle
                    center={centerPosition}
                    radius={radius / 30}
                    options={{
                        fillColor: 'red',
                        fillOpacity: 0.5,
                        strokeOpacity: 0,
                    }}
                />
                <style jsx>
                    {`
                        .info-box {
                            background-color: #fff;
                            padding: 12px;
                            width: 250px;
                            color: #000;
                            border-radius: 8px;
                        }
                        .info-box .left {
                            display: inline-block;
                            padding-right: 10px;
                            width: 50px;
                            vertical-align: top;
                        }
                        .info-box .right {
                            display: inline-block;
                            width: calc(100% - 50px);
                        }
                        .info-box .title {
                            font-size: 16px;
                        }
                        .info-box .description {
                            line-height: 18px;
                            margin-top: 4px;
                        }
                    `}
                </style>
                {selectedStore && (
                    <div className="werwer">
                        <InfoBox
                            // eslint-disable-next-line no-undef
                            position={new google.maps.LatLng(selectedStore.lat, selectedStore.lng)}
                            options={{ closeBoxURL: '', enableEventPropagation: true }}
                        >
                            <div className="info-box">
                                <div className="left">
                                    <div className="image">
                                        <img alt={selectedStore.store_name} src={selectedStore.baseimage} width="100%" />
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="title">
                                        {selectedStore.store_name}
                                    </div>
                                    <div className="description">
                                        {`${selectedStore.state}, ${selectedStore.city}, ${selectedStore.address}`}
                                        <br />
                                        {selectedStore.phone}
                                    </div>
                                </div>
                            </div>
                        </InfoBox>
                    </div>
                )}
                {props.isMarkerShown && mapPositions.map((position, i) => (
                    (getDistance(position, centerPosition) <= radius) || isShowAllStore
                        ? <Marker position={position} key={i} onClick={() => setSelectedStore(position)} />
                        : null
                ))}
            </GoogleMap>
        </>
    );
});

export default StoreLocatorMaps;
