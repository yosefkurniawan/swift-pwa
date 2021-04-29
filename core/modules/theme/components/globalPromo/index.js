import React from 'react';
import { features } from '@config';
import { getCookies } from '@helpers/cookies';
import WidgetSliderCaraousel from '@core_modules/cms/components/cms-renderer/widget-slider-caraousel';
import {
    getCmsBlocks,
} from '../../services/graphql';

const GlobalPromoMessage = (props) => {
    const { storeConfig, ...other } = props;
    const { key_cookies } = features.globalPromo;
    const [showPromo, setShowPromo] = React.useState(true);
    const { data } = getCmsBlocks(
        {
            identifiers: 'weltpixel_global_promo_message',
        },
    );

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const enablePromo = getCookies(key_cookies);
            if (enablePromo !== '') {
                setShowPromo(enablePromo);
            }
        }
        // setMainMinimumHeight(refFooter.current.clientHeight + refHeader.current.clientHeight);
    }, []);

    if (storeConfig.global_promo.enable && showPromo && data
        && data.cmsBlocks && data.cmsBlocks.items[0] && data.cmsBlocks.items[0].content) {
        return (
            <WidgetSliderCaraousel
                content={data.cmsBlocks.items[0].content}
                key_cookies={key_cookies}
                backgroundColor={storeConfig.global_promo.background_color}
                textColor={storeConfig.global_promo.text_color}
                storeConfig={storeConfig}
                {...other}
            />
        );
    }

    return null;
};

export default GlobalPromoMessage;
