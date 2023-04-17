/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import * as React from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

import useStyles from '@core_modules/home/pages/default/components/style';

const BannerSlider = dynamic(() => import('@core_modules/home/pages/default/components/Banner'));
const CategoryList = dynamic(() => import('@core_modules/home/pages/default/components/CategoryList'));
const CmsPage = dynamic(() => import('@core_modules/cms/pages/default'));
const FeaturedProducts = dynamic(() => import('@core_modules/home/pages/default/components/FeaturedProducts'));

const Content = (props) => {
    const styles = useStyles();
    let useCmsPage = {};

    const {
        cmsHome, homePageConfig, storeConfig: config, ...other
    } = props;
    let storeConfig = config;
    const useCms = storeConfig?.pwa?.use_cms_page_enable;

    if (homePageConfig && homePageConfig.pwa) {
        storeConfig = {
            ...config,
            pwa: {
                ...config.pwa,
                ...homePageConfig.pwa,
            },
        };
        useCmsPage = {
            enable: storeConfig.pwa.use_cms_page_enable,
            identifier: storeConfig.pwa.use_cms_page_identifier,
        };
    }

    const logoUrl = `${props.storeConfig.secure_base_media_url}logo/${props.storeConfig.header_logo_src}`;

    let content = '';

    if (homePageConfig && useCmsPage?.enable) {
        content = (
            <>
                <CmsPage
                    onlyCms
                    slug={[useCmsPage.identifier]}
                    withLayoutHeader
                    withLayoutFooter
                    withCmsTitle={false}
                    {...other}
                    storeConfig={storeConfig}
                    pageConfig={cmsHome}
                />
            </>
        );
    } else {
        content = (
            <>
                <BannerSlider {...other} storeConfig={storeConfig} />
                <FeaturedProducts {...other} storeConfig={storeConfig} />
                <CategoryList {...other} storeConfig={storeConfig} />
            </>
        );
    }

    return (
        <div className={useCms ? styles.cmsContainer : styles.container}>
            {props.storeConfig && props.storeConfig.pwa && props.storeConfig.pwa.mobile_navigation !== 'burger_menu' && (
                <div className={classNames(styles.header)}>
                    <div className={classNames(styles.logo, 'hidden-desktop')}>
                        {/* TODO: set height, width. priorty after desktop performance */}
                        <img src={logoUrl} alt="logo" className={styles.imgLogo} />
                    </div>
                </div>
            )}
            {content}
        </div>
    );
};

export default Content;
