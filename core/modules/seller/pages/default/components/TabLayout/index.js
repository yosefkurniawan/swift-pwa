/* eslint-disable max-len */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Typography from '@common_typography';
import useStyles from '@core_modules/seller/pages/default/components/style';

function TabLayout({ noBanner, t, children }) {
    const styles = useStyles();
    const router = useRouter();
    const { route, query: { sellerId } } = router;
    const isTabOne = route === '/seller/[sellerId]';
    const isTabTwo = route === '/seller/[sellerId]/product' || noBanner;

    return (
        <>
            <div className={styles.tabContainer}>
                {
                    !noBanner && (
                        <>
                            <Link replace href={{ pathname: `/seller/${sellerId}` }}>
                                <a>
                                    <Typography type={isTabOne ? 'bold' : 'regular'} style={isTabOne ? { borderBottom: '2px solid #000' } : null} variant="h2" letter="capitalize">
                                        {t('seller:home')}
                                    </Typography>
                                </a>
                            </Link>
                            <Link replace href={{ pathname: `/seller/${sellerId}/product` }}>
                                <a>
                                    <Typography style={isTabTwo ? { borderBottom: '2px solid #000' } : null} type={isTabTwo ? 'bold' : 'regular'} variant="h2" letter="capitalize">
                                        {t('seller:product')}
                                    </Typography>
                                </a>
                            </Link>
                        </>
                    )
                }
                {
                    noBanner && (
                        <a>
                            <Typography style={isTabTwo ? { borderBottom: '2px solid #000' } : null} type={isTabTwo ? 'bold' : 'regular'} variant="h2" letter="capitalize">
                                {t('seller:product')}
                            </Typography>
                        </a>
                    )
                }
            </div>
            <div>{children}</div>
        </>
    );
}

export default TabLayout;
