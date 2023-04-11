/* eslint-disable no-unused-vars */
/* eslint-disable react/no-danger */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import { getBannerSeller } from '@core_modules/seller/services/graphql';
import Typography from '@common_typography';
import Skeleton from '@common_skeleton';
import useStyles from '@core_modules/seller/pages/default/components/style';
import React from 'react';
import TabLayout from '@core_modules/seller/pages/default/components/TabLayout';
import SellerInfo from '@core_modules/seller/pages/default/components/SellerInfo';
import DesktopContent from '@core_modules/seller/pages/default/components/desktop';
import MobileContent from '@core_modules/seller/pages/default/components/mobile';

const Content = (props) => {
    const { storeConfig, t, dataSeller, errorSeller, loadingSeller, link, sellerId, isLogin, route, handleChat, showChat, banner, ...other } = props;
    const styles = useStyles();

    return (
        <>
            {!loadingSeller && dataSeller && dataSeller.getSeller.length === 0 && (
                <Typography type="bold" variant="h4" letter="capitalize" style={{ paddingBottom: '1rem', paddingLeft: '1rem' }}>
                    {t('seller:notFound')}
                </Typography>
            )}
            {dataSeller && dataSeller.getSeller.length > 0 && (
                <>
                    <SellerInfo {...props} />
                    <div className={styles.sellerProduct}>
                        <TabLayout noBanner={banner} t={t}>
                            {
                                loadingSeller && (
                                    <div className={styles.skeletonWrapper}>
                                        <Skeleton variant="rect" animation="wave" xsStyle={{ width: '100%', height: `${storeConfig.pwa.home_slider_mobile_height}px` }} mdStyle={{ width: '100%', height: `${storeConfig.pwa.home_slider_desktop_height}px` }} />
                                    </div>
                                )
                            }
                            {
                                dataSeller && dataSeller.getSeller && dataSeller.getSeller.length > 0 && (
                                    <>
                                        <div className="hidden-mobile">
                                            <DesktopContent data={JSON.parse(dataSeller.getSeller[0].banner_desktop)} storeConfig={storeConfig} />
                                        </div>
                                        <div className="hidden-desktop">
                                            <MobileContent data={JSON.parse(dataSeller.getSeller[0].banner_mobile)} storeConfig={storeConfig} />
                                        </div>
                                    </>
                                )
                            }
                        </TabLayout>
                    </div>
                </>
            )}
        </>
    );
};

export default Content;
