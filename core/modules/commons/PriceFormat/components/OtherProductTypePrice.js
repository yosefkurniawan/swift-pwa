/* eslint-disable camelcase */
import React from 'react';
import classNames from 'classnames';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import useStyles from '@common_priceformat/style';
import { useTranslation } from 'next-i18next';

const getLowestTierPrice = (tier_price) => {
    let lowestTierPrice;
    let min = Number.POSITIVE_INFINITY;
    tier_price.forEach((price) => {
        if (price.final_price.value < min) {
            min = price.final_price.value;
            lowestTierPrice = price;
        }
    });

    return lowestTierPrice;
};

const AsLowAsText = () => {
    const styles = useStyles();
    const { t } = useTranslation(['common']);
    return (
        <Typography
            variant="span"
            size="8"
            letter="uppercase"
            className={classNames(styles.noMargin, 'price_text')}
        >
            {t('common:price:asLowAs')}
            {' '}
        </Typography>
    );
};

const StartingAt = () => {
    const styles = useStyles();
    const { t } = useTranslation(['common']);
    return (
        <Typography
            variant="span"
            size="8"
            letter="uppercase"
            className={classNames(styles.noMargin, 'price_text')}
        >
            {t('common:price:startFrom')}
            {' '}
        </Typography>
    );
};

const OtherProductTypePrice = (props) => {
    const {
        priceRange, specialFromDate, specialToDate, additionalPrice, currencyCache, productType, priceTiers, isPdp, isQuickView,
    } = props;
    const styles = useStyles();
    const otherPrice = additionalPrice || 0;
    const regularPrice = priceRange.minimum_price.regular_price;
    const finalPrice = priceRange.minimum_price.final_price;
    let validSpecial = true;
    const nowTime = new Date(Date.now()).getTime();
    if (specialFromDate && specialFromDate !== null) {
        const startTime = new Date(specialFromDate).getTime();
        if (nowTime < startTime) validSpecial = false;
    }
    if (specialToDate && specialToDate !== null) {
        const endTime = new Date(specialToDate).getTime();
        if (nowTime > endTime) validSpecial = false;
    }

    if (productType === 'GroupedProduct' && !isPdp && !isQuickView) {
        return (
            <>
                <StartingAt />
                <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                    {formatPrice(finalPrice.value + otherPrice, finalPrice.currency, currencyCache)}
                </Typography>
            </>
        );
    }

    // if has tierprice & is configurable product
    if (priceTiers && priceTiers.length && productType === 'ConfigurableProduct') {
        const lowestPriceTier = getLowestTierPrice(priceTiers);
        // if there are several tierprices
        if (priceTiers.length > 1) {
            // case 1: if has no discount
            if (regularPrice.value === finalPrice.value) {
                return (
                    <>
                        {/* case 1 */}
                        <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                            {formatPrice(finalPrice.value + otherPrice, finalPrice.currency, currencyCache)}
                        </Typography>
                        {!isPdp && !isQuickView && (
                            <>
                                <AsLowAsText />
                                <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                                    {formatPrice(lowestPriceTier.final_price.value + otherPrice, lowestPriceTier.final_price.currency, currencyCache)}
                                </Typography>
                            </>
                        )}
                    </>
                );
            }
            // case 2: if final price is lowest than lowest tier price
            if (finalPrice.value < lowestPriceTier.final_price.value) {
                return (
                    <>
                        {/* case 2 */}
                        <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                            <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)}</strike>
                        </Typography>
                        <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                            {formatPrice(finalPrice.value + otherPrice, finalPrice.currency, currencyCache)}
                        </Typography>
                    </>
                );
            }
            // case 3: if final price is higher than lowest tier price
            return (
                <>
                    {/* case 3 */}
                    <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)}</strike>
                    </Typography>
                    <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        {formatPrice(finalPrice.value + otherPrice, finalPrice.currency, currencyCache)}
                    </Typography>
                    {!isPdp && !isQuickView && (
                        <>
                            <AsLowAsText />
                            <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                                {formatPrice(lowestPriceTier.final_price.value + otherPrice, lowestPriceTier.final_price.currency, currencyCache)}
                            </Typography>
                        </>
                    )}
                </>
            );
        }

        // else:
        // if there is only one tierprice
        const firstTierPrice = priceTiers[0];
        // case 4: if there is no discount and has tier price
        if (regularPrice.value === finalPrice.value) {
            return (
                <>
                    {/* case 4 */}
                    <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)}</strike>
                    </Typography>
                    <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        {formatPrice(firstTierPrice.final_price.value + otherPrice, firstTierPrice.final_price.currency, currencyCache)}
                    </Typography>
                </>
            );
        }
        // case 5: if final price is lower than tier price
        if (finalPrice.value < firstTierPrice.final_price.value) {
            return (
                <>
                    {/* case 5 */}
                    <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)}</strike>
                    </Typography>
                    <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        {formatPrice(finalPrice.value + otherPrice, finalPrice.currency, currencyCache)}
                    </Typography>
                </>
            );
        }
        // case 6: if tier price is lower than final price and tier price qty is 1
        if (firstTierPrice.quantity === 1 || finalPrice.value === firstTierPrice.final_price.value) {
            return (
                <>
                    {/* case 6 */}
                    <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)}</strike>
                    </Typography>
                    <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                        {formatPrice(firstTierPrice.final_price.value + otherPrice, firstTierPrice.final_price.currency, currencyCache)}
                    </Typography>
                </>
            );
        }
        // case 7: if tier price is lower than final price but tier price qty > 1
        return (
            <>
                {/* case 7 */}
                <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                    <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)}</strike>
                </Typography>
                <Typography variant="span" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                    {formatPrice(finalPrice.value + otherPrice, finalPrice.currency, currencyCache)}
                </Typography>
                {!isPdp && !isQuickView && (
                    <>
                        <AsLowAsText />
                        <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                            {formatPrice(firstTierPrice.final_price.value + otherPrice, firstTierPrice.final_price.currency, currencyCache)}
                        </Typography>
                    </>
                )}
            </>
        );
    }

    // if not configurable product and dont have tier price
    if (regularPrice.value === finalPrice.value) {
        return (
            <>
                <Typography variant="span" type="bold" letter="uppercase" className={classNames(styles.noMargin, 'price_text')}>
                    {formatPrice(finalPrice.value + otherPrice, finalPrice.currency, currencyCache)}
                </Typography>
            </>
        );
    }

    return (
        <>
            {/* case 9 */}
            {
                validSpecial ? (
                    <Typography
                        variant="span"
                        letter="capitalize"
                        className={classNames(styles.noMargin, styles.oldPrice, 'price_text')}
                    >
                        <strike>{formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)}</strike>
                    </Typography>
                ) : null
            }
            <Typography
                variant="span"
                type="bold"
                letter="capitalize"
                className={classNames(styles.noMargin, styles.finalPrice, 'price_text')}
            >
                {
                    validSpecial ? formatPrice(finalPrice.value, finalPrice.currency, currencyCache)
                        : formatPrice(regularPrice.value + otherPrice, regularPrice.currency, currencyCache)
                }
            </Typography>
        </>
    );
};

export default OtherProductTypePrice;
