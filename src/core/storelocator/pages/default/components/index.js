import Layout from '@core/customer/components/layout';
import StoreLocatorMaps from './Maps';
import SkeletonStoreLocator from './Skeleton';

const StoreMaps = ({ gmapKey }) => {
    const [centerPosition, setCenterPosition] = React.useState({});
    const [storeLocations, setStoreLocations] = React.useState([]);

    React.useEffect(() => {
        setCenterPosition({ lat: -6.95, lng: 107.65 });
        setStoreLocations([
            { lat: -6.97, lng: 107.65 },
            { lat: -7.00, lng: 107.55 },
        ]);
    }, []);

    return (
        <StoreLocatorMaps
            centerPosition={centerPosition}
            mapPositions={storeLocations}
            gmapKey={gmapKey}
        />
    );
};

const StoreLocatorContent = (props) => {
    const {
        // t,
        loading,
        storeConfig,
    } = props;

    return (
        <Layout {...props}>
            {
                loading
                    ? <SkeletonStoreLocator />
                    : (
                        <StoreMaps
                            gmapKey={storeConfig.icube_pinlocation_gmap_key}
                        />
                    )
            }
        </Layout>
    );
};

export default StoreLocatorContent;
