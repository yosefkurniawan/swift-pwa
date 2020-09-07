/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
import Layout from '@core/customer/components/layout';
import IcubeMaps from '@common_googlemaps';
import SkeletonStoreLocator from './skeleton';

const StoreMaps = ({ gmapKey }) => {
    const [mapPosition, setMapPosition] = React.useState({
        lat: '-6.197361',
        lng: '106.774535',
    });

    const handleCurrentPosition = (position) => {
        setMapPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        });
    };

    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleCurrentPosition);
        }
    }, []);

    return (
        <IcubeMaps
            height="230px"
            mapPosition={mapPosition}
            dragMarkerDone={(e) => { console.log(e); }}
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
