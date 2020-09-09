import StoreLocatorMaps from './Maps';
import SkeletonStoreLocator from './Skeleton';
import StoreList from './StoreList';

const StoreLocatorContent = ({ gmapKey, storeLocations }) => {
    const [centerPosition, setCenterPosition] = React.useState({});

    React.useEffect(() => {
        setCenterPosition({ lat: -6.95, lng: 107.65 });
    }, []);

    const storeList = storeLocations.map((storeLocation) => ({
        ...storeLocation,
        lat: storeLocation.latitude,
        lng: storeLocation.longitude,
    }));

    return (
        <div className="row">
            <div className="col-md-3">
                <StoreList storeList={storeList} />
            </div>
            <div className="col-md-9">
                <StoreLocatorMaps
                    centerPosition={centerPosition}
                    mapPositions={storeList}
                    gmapKey={gmapKey}
                />
            </div>
        </div>
    );
};

const StoreLocatorContentWrapper = (props) => {
    const {
        loading,
        storeLocations,
        storeConfig,
    } = props;

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
