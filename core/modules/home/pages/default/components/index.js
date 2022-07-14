/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import * as React from 'react';
import dynamic from 'next/dynamic';
import useStyles from '@core_modules/home/pages/default/components/style';
import CmsPage from '@core_modules/cms/pages/default';
import classNames from 'classnames';

const BannerSlider = dynamic(() => import('@core_modules/home/pages/default/components/Banner'));
const FeaturedProducts = dynamic(() => import('@core_modules/home/pages/default/components/FeaturedProducts'));
const CategoryList = dynamic(() => import('@core_modules/home/pages/default/components/CategoryList'));

const Content = (props) => {
    const styles = useStyles();
    let useCmsPage = {};

    const {
        homePageConfig, storeConfig: config, ...other
    } = props;

    let storeConfig = config;

    if (homePageConfig && homePageConfig.storeConfig && homePageConfig.storeConfig.pwa) {
        storeConfig = {
            ...config,
            pwa: {
                ...config.pwa,
                ...homePageConfig.storeConfig.pwa,
            },
        };
        useCmsPage = {
            enable: storeConfig.pwa.use_cms_page_enable,
            identifier: storeConfig.pwa.use_cms_page_identifier,
        };
    }

    const logoUrl = `${props.storeConfig.secure_base_media_url}logo/${props.storeConfig.header_logo_src}`;

    let content = '';

    if (homePageConfig && useCmsPage && useCmsPage.enable) {
        content = (
            <>
                <CmsPage
                    onlyCms
                    slug={[useCmsPage.identifier]}
                    withLayoutHeader={false}
                    withLayoutFooter={false}
                    withCmsTitle={false}
                    {...other}
                    storeConfig={storeConfig}
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
        <div className={styles.container}>
            {props.storeConfig && props.storeConfig.pwa && props.storeConfig.pwa.mobile_navigation !== 'burger_menu' && (
                <div className={classNames(styles.header)}>
                    <div className={classNames(styles.logo, 'hidden-desktop')}>
                        <img src={logoUrl} alt="logo" className={styles.imgLogo} />
                    </div>
                </div>
            )}
            {content}
        </div>
    );
};

export default Content;
