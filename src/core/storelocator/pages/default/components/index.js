import StoreLocatorMaps from './Maps';
import SkeletonStoreLocator from './Skeleton';
import StoreList from './StoreList';

const StoreLocatorContent = ({ gmapKey, storeLocations }) => {
    // state
    const [centerPosition, setCenterPosition] = React.useState({});
    const [selectedStore, setSelectedStore] = React.useState();
    const [storeList, setStoreList] = React.useState(
        storeLocations.map((storeLocation) => ({
            ...storeLocation,
            lat: storeLocation.latitude,
            lng: storeLocation.longitude,
        })),
    );

    // effect
    React.useEffect(() => {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lng = position.coords.longitude;
                const lat = position.coords.latitude;
                setCenterPosition({ lat, lng });
            });
        } else {
            setCenterPosition({ lat: -6.17539, lng: 106.82715 });
        }
    }, []);

    return (
        <div className="row">
            <div className="col-md-3">
                <StoreList
                    storeList={storeList}
                    totalAllStore={storeLocations.length}
                    onClickListItem={(store) => {
                        setCenterPosition({ lat: store.lat, lng: store.lng });
                        setSelectedStore(store);
                    }}
                />
            </div>
            <div className="col-md-9">
                <StoreLocatorMaps
                    centerPosition={centerPosition}
                    mapPositions={storeList}
                    gmapKey={gmapKey}
                    setStoreList={setStoreList}
                    selectedStore={selectedStore}
                />
            </div>
        </div>
    );
};

const StoreLocatorContentWrapper = (props) => {
    const { loading, storeLocations, storeConfig } = props;
    return (
        <>
            {
                loading || typeof window === 'undefined'
                    ? <SkeletonStoreLocator />
                    : (
                        <StoreLocatorContent
                            gmapKey={storeConfig.icube_pinlocation_gmap_key}
                            storeLocations={storeLocations}
                        />
                    )
            }
        </>
    );
};

export default StoreLocatorContentWrapper;
