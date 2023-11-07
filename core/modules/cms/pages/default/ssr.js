import { getCmsPage } from '@core_modules/cms/services/graphql/schema';
import { getSlider } from '@core_modules/home/service/graphql/schema';
import { findImages } from '@core_modules/cms/pages/default/core';

const getSSRProps = async ({ apolloClient, identifier = '' }) => {
    // get cms page
    const cmsRes = await apolloClient.query({
        query: getCmsPage,
        variables: {
            identifier,
        },
    });

    // get cms slider
    const cmsData = cmsRes?.data;
    const mixedContents = cmsData?.cmsPage?.content?.replace('[/mgz_pagebuilder]', '[mgz_pagebuilder]').split('[mgz_pagebuilder]');
    const removeIdentifier = mixedContents && mixedContents[1] ? JSON.parse(mixedContents[1]) : null;
    const result = findImages(removeIdentifier?.elements);

    let sliderCmsRes = null;
    if (result) {
        sliderCmsRes = await apolloClient.query({
            query: getSlider,
            variables: { input: { id: parseInt(result?.split('slider_id')[1]?.split('"')[1], 10) } },
        });
    }

    return {
        props: {
            cmsData: cmsData ?? null,
            sliderCmsData: sliderCmsRes ?? null,
        },
    };
};

export default getSSRProps;
