import Layout from '@core/customer/components/layout';
import StoreLocatorMaps from './Maps';
import SkeletonStoreLocator from './Skeleton';

const StoreMaps = ({ gmapKey }) => {
    const [centerPosition, setCenterPosition] = React.useState({});
    const [storeLocations, setStoreLocations] = React.useState([]);

    React.useEffect(() => {
        setCenterPosition({ lat: -6.97618300042124, lng: 107.65397982405091 });
        setStoreLocations([
            { lat: -6.9785684616325865, lng: 107.65306787298584 },
            { lat: -6.984106092570553, lng: 107.65289621160889 },
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
