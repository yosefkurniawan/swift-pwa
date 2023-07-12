/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import graphqlSSR from '@graphql_ssr';
import { getCmsPage } from '@core_modules/cms/services/graphql/schema';
import { getSlider } from '@core_modules/home/service/graphql/schema';

const getSSRProps = async (identifier = '') => {
    // get cms page
    const cmsData = await graphqlSSR(getCmsPage, { identifier });

    // eslint-disable-next-line consistent-return
    const findImages = (content) => {
        const nonTextElements = content?.filter((_el) => _el.type !== 'text' && _el?.elements?.length > 0);
        // console.log('nonTextElements', nonTextElements);
        // let textElement = '';
        if (nonTextElements?.length > 0) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < nonTextElements.length; i++) {
                // console.log('i', i);
                // const element = nonTextElements[i];
                return findImages(nonTextElements[i]?.elements);
            }
            // findImages(nonTextElements);
        } else {
            // eslint-disable-next-line no-lonely-if
            if (content?.length > 0 && content[0]?.type === 'text') {
                // console.log('content', content[0].content);
                return content[0].content;
            }
        }
    };

    // get cms slider
    const mixedContents = cmsData?.cmsPage?.content?.replace('[/mgz_pagebuilder]', '[mgz_pagebuilder]').split('[mgz_pagebuilder]');
    const removeIdentifier = mixedContents && JSON.parse(mixedContents[1]);
    const result = findImages(removeIdentifier?.elements);

    let sliderCmsData;
    if (result) {
        sliderCmsData = await graphqlSSR(getSlider, { input: { id: parseInt(result?.split('slider_id')[1]?.split('"')[1], 10) } });
    }

    return {
        props: {
            cmsData,
            sliderCmsData,
        },
    };
};

export default getSSRProps;
