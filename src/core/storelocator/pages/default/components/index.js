import StoreLocatorMaps from './Maps';
import SkeletonStoreLocator from './Skeleton';

const StoreMaps = ({ gmapKey }) => {
    const [centerPosition, setCenterPosition] = React.useState({});
    const [storeLocations, setStoreLocations] = React.useState([]);

    React.useEffect(() => {
        setCenterPosition({ lat: -6.95, lng: 107.65 });
        setStoreLocations([
            { store_name: 'store 1', lat: -6.97, lng: 107.65 },
            { store_name: 'store 2', lat: -7.00, lng: 107.55 },
        ]);
    }, []);

    return (
        <div className="row">
            <div className="col-md-3">
                <div style={{ border: '2px solid #ccc', height: '100%' }}>
                    {`Store List (${storeLocations.length} stores)`}
                    {storeLocations.map((storeLocation, i) => (
                        <div key={i}>{storeLocation.store_name}</div>
                    ))}
                </div>
            </div>
            <div className="col-md-9">
                <StoreLocatorMaps
                    centerPosition={centerPosition}
                    mapPositions={storeLocations}
                    gmapKey={gmapKey}
                />
            </div>
        </div>
    );
};

const StoreLocatorContent = (props) => {
    const {
        // t,
        loading,
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
                        />
                    )
            }
        </>
    );
};

export default StoreLocatorContent;
