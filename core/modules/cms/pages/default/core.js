/* eslint-disable react/destructuring-assignment */
/* eslint-disable eqeqeq */
import Layout from '@layout';
// import { getCmsPage } from '@core_modules/cms/services/graphql';
import Content from '@core_modules/cms/pages/default/components';
// import gqlService from '@core_modules/home/service/graphql';
import { generateThumborUrl } from '@root/core/helpers/image';
//
const CmsSlug = (props) => {
    const {
        cmsData, sliderCmsData, pageConfig, t, slug, ...other
    } = props;
    // const { cmsData, error, loading } = getCmsPage({ identifier: slug[0] });
    // const mixedContents = cmsData?.cmsPage?.content?.replace('[/mgz_pagebuilder]', '[mgz_pagebuilder]').split('[mgz_pagebuilder]');
    // const removeIdentifier = mixedContents && JSON.parse(mixedContents[1]);

    // eslint-disable-next-line consistent-return
    // const findImages = (content) => {
    //     const nonTextElements = content?.filter((_el) => _el.type !== 'text' && _el?.elements?.length > 0);
    //     // console.log('nonTextElements', nonTextElements);
    //     // let textElement = '';
    //     if (nonTextElements?.length > 0) {
    //         // eslint-disable-next-line no-plusplus
    //         for (let i = 0; i < nonTextElements.length; i++) {
    //             // console.log('i', i);
    //             // const element = nonTextElements[i];
    //             return findImages(nonTextElements[i]?.elements);
    //         }
    //         // findImages(nonTextElements);
    //     } else {
    //         // eslint-disable-next-line no-lonely-if
    //         if (content?.length > 0 && content[0]?.type === 'text') {
    //             // console.log('content', content[0].content);
    //             return content[0].content;
    //         }
    //     }

    //     // console.log('findImages', content?.elements?.filter((_el) => _el.type !== 'text'));
    //     // if (content?.elements?.find((_el) => _el?.type !== 'single_image' && _el?.elements?.length > 0)) {
    //     //     console.log('hehe');
    //     //     findImages(content.elements);
    //     // } else {
    //     //     console.log('found', content);
    //     // }
    // };

    // const result = findImages(removeIdentifier?.elements);
    // // console.log('result:', result.split('slider_id')[1].split('"'));

    // const { data: sliderCmsData } = gqlService.getSlider({
    //     skip: !result,
    //     variables: {
    //         input: { id: parseInt(result?.split('slider_id')[1]?.split('"')[1], 10) },
    //     },
    // });

    // console.log('CmsSlug', { sliderCmsData });

    const enable = props?.storeConfig && props?.storeConfig?.pwa && props?.storeConfig?.pwa.thumbor_enable;
    const useHttpsOrHttp = props?.storeConfig && props?.storeConfig?.pwa && props?.storeConfig?.pwa.thumbor_https_http;
    const thumborUrl = props?.storeConfig && props?.storeConfig?.pwa && props?.storeConfig?.pwa.thumbor_url;
    const images = sliderCmsData?.slider?.images?.map((_img) => ({
        desktop: generateThumborUrl(_img?.image_url, 1200, 600, enable, useHttpsOrHttp, thumborUrl, 80),
        mobile: generateThumborUrl(_img?.mobile_image_url, 500, 600, enable, useHttpsOrHttp, thumborUrl, 80),
    }));

    const ogContent = {};
    if (cmsData && cmsData.cmsPage) {
        if (cmsData.cmsPage.meta_description) {
            ogContent.description = {
                type: 'meta',
                value: cmsData.cmsPage.meta_description,
            };
        }
        if (cmsData.cmsPage.meta_keywords) {
            ogContent.keywords = {
                type: 'meta',
                value: cmsData.cmsPage.meta_keywords,
            };
        }
    }
    const Config = {
        title: cmsData && cmsData.cmsPage ? cmsData.cmsPage.meta_title || cmsData.cmsPage.title : '',
        headerTitle: cmsData && cmsData.cmsPage ? cmsData.cmsPage.title : '',
        bottomNav: false,
        header: 'relative', // available values: "absolute", "relative", false (default)
        ogContent,
    };
    const isHome = pageConfig?.pageType;

    return (
        <Layout
            {...props}
            pageConfig={pageConfig || Config}
            cmsData={cmsData}
            isCms={isHome != 'home'}
            isHomepage={isHome == 'home'}
            preloadImages={images?.length > 0 && images[0]}
        >
            {other.storeConfig.pwa.use_cms_page_enable ? <h1 style={{ display: 'none' }}>{Config.title}</h1> : null}
            <Content cmsData={cmsData} t={t} loading={false} error={false} {...other} />
        </Layout>
    );
};

export default CmsSlug;
