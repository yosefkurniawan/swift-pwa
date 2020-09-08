import StoreLocatorMaps from './Maps';
import SkeletonStoreLocator from './Skeleton';

const StoreMaps = ({ gmapKey, storeLocations }) => {
    const [centerPosition, setCenterPosition] = React.useState({});

    React.useEffect(() => {
        setCenterPosition({ lat: -6.95, lng: 107.65 });
    }, []);

    const mapPositions = storeLocations.map((storeLocation) => ({
        ...storeLocation,
        lat: storeLocation.latitude,
        lng: storeLocation.longitude,
    }));

    return (
        <div className="row">
            <div className="col-md-3">
                <div style={{ border: '2px solid #ccc', height: '100%' }}>
                    {`Store List (${mapPositions.length} stores)`}
                    {mapPositions.map((storeLocation, i) => (
                        <li key={i}>
                            {storeLocation.store_name}
                            <br />
                            {`${storeLocation.lat} / ${storeLocation.lng}`}
                        </li>
                    ))}
                </div>
            </div>
            <div className="col-md-9">
                <StoreLocatorMaps
                    centerPosition={centerPosition}
                    mapPositions={mapPositions}
                    gmapKey={gmapKey}
                />
            </div>
        </div>
    );
};

const StoreLocatorContent = (props) => {
    const {
        loading,
        storeLocations,
        storeConfig,
    } = props;

    return (
        <>
            {
                loading
                    ? <SkeletonStoreLocator />
                    : (
                        <StoreMaps
                            gmapKey={storeConfig.icube_pinlocation_gmap_key}
                            storeLocations={storeLocations}
                        />
                    )
            }
        </>
    );
};

export default StoreLocatorContent;
