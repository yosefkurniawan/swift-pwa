/* eslint-disable no-unused-vars */
import { getEtalase } from '@core_modules/seller/services/graphql';
import TabView from '@common_tabs';
import Typography from '@common_typography';
import useStyles from '@core_modules/seller/pages/default/components/style';
import DetailProductView from '@plugin_productitem/components/Detail';
import ImageProductView from '@plugin_productitem/components/Image';
import CoreBase from '@plugin_productlist/core';
import dynamic from 'next/dynamic';
import React from 'react';
import TabLayout from '@core_modules/seller/pages/default/components/TabLayout';
import SellerInfo from '@core_modules/seller/pages/default/components/SellerInfo';
import EtalaseDesktop from '@core_modules/seller/pages/default/components/Products/etalaseDesktop';
import EtalaseMobile from '@core_modules/seller/pages/default/components/Products/etalaseMobile';

const ErrorMessage = dynamic(() => import('@plugin_productlist/components/ErrorMessage'), { ssr: false });
const ProductListSkeleton = dynamic(() => import('@plugin_productlist/components/ProductListSkeleton'), { ssr: false });
const FilterView = dynamic(() => import('@plugin_productlist/components/Filter/view'), { ssr: false });
const FilterModalView = dynamic(() => import('@plugin_productlist/components/Filter/FilterDialog'), { ssr: false });

const ContentProducts = (props) => {
    const {
        storeConfig, t, dataSeller, errorSeller, loadingSeller, link, sellerId, isLogin, route, handleChat, showChat, banner, ...other
    } = props;
    const styles = useStyles();

    const { data } = getEtalase({
        variables: {
            sellerId: parseInt(route.query.sellerId, 10),
        },
    });

    const dataEtalase = data && data.getEtalase.length > 0 ? data.getEtalase : null;

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
                            <div className="row">
                                {
                                    dataEtalase && (
                                        <>
                                            <div className="col-md-2 hidden-mobile">
                                                <EtalaseDesktop noBanner={banner} t={t} data={dataEtalase} route={route} />
                                            </div>
                                            <div className="hidden-desktop" style={{ width: '100%' }}>
                                                <EtalaseMobile noBanner={banner} t={t} data={dataEtalase} route={route} />
                                            </div>
                                        </>
                                    )
                                }
                                <div className={dataEtalase ? 'col-md-10 col-12' : 'col-md-12'} style={{ width: '100%' }}>
                                    <CoreBase
                                        t={t}
                                        ErrorMessage={ErrorMessage}
                                        ProductListSkeleton={ProductListSkeleton}
                                        ImageProductView={ImageProductView}
                                        DetailProductView={DetailProductView}
                                        TabView={TabView}
                                        FilterView={FilterView}
                                        FilterModalView={FilterModalView}
                                        defaultSort={{ key: 'position', value: 'ASC' }}
                                        sellerId={sellerId}
                                        {...props}
                                    />
                                </div>
                            </div>
                        </TabLayout>
                    </div>
                </>
            )}
        </>
    );
};

export default ContentProducts;
