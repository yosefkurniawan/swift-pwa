import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

import { features } from '@config';
import WidgetSliderCaraousel from '@core_modules/cms/components/cms-renderer/widget-slider-caraousel';
import {
    getCmsBlocks,
} from '@core_modules/theme/services/graphql';
import useStyles from '@core_modules/theme/components/globalPromo/styles';

const GlobalPromoMessage = (props) => {
    const styles = useStyles();

    const { storeConfig, showGlobalPromo, ...other } = props;
    const { key_cookies } = features.globalPromo;

    const { data, loading } = getCmsBlocks({
        identifiers: 'weltpixel_global_promo_message',
    });

    if (loading) {
        return (
            <Box className={styles.containerLoading}>
                <Skeleton animation="wave" variant="text" width="60%" height={16} />
            </Box>
        );
    }

    if (showGlobalPromo && data?.cmsBlocks?.items[0]?.content) {
        return (
            <WidgetSliderCaraousel
                className={styles.container}
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
