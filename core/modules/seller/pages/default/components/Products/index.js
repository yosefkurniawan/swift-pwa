/* eslint-disable no-unused-vars */
/* eslint-disable react/no-danger */
/* eslint-disable object-curly-newline */
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

const ErrorMessage = dynamic(() => import('@plugin_productlist/components/ErrorMessage'), { ssr: false });
const ProductListSkeleton = dynamic(() => import('@plugin_productlist/components/ProductListSkeleton'), { ssr: false });
const FilterView = dynamic(() => import('@plugin_productlist/components/Filter/view'), { ssr: false });
const FilterModalView = dynamic(() => import('@plugin_productlist/components/Filter/FilterDialog'), { ssr: false });

const ContentProducts = (props) => {
    const { storeConfig, t, dataSeller, errorSeller, loadingSeller, link, sellerId, isLogin, route, handleChat, showChat, ...other } = props;
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
                        <TabLayout t={t}>
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
                        </TabLayout>
                    </div>
                </>
            )}
        </>
    );
};

export default ContentProducts;
