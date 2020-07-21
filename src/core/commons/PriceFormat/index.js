/* eslint-disable camelcase */
import React from 'react';
import Typography from '@Typography';
import { formatPrice } from '@helpers/currency';
import useStyles from './style';

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
    return (
        <Typography
            variant="span"
            size="8"
            letter="uppercase"
            className={styles.noMargin}
        >
            as low as:
            {' '}
        </Typography>
    );
};

const SimpleProductTypePrice = ({ priceRange, priceTiers }) => {
    const styles = useStyles();
    const regularPrice = priceRange.minimum_price.regular_price;
    const finalPrice = priceRange.minimum_price.final_price;

    // if has tierprice
    if (priceTiers && priceTiers.length) {
        const lowestPriceTier = getLowestTierPrice(priceTiers);
        // if there are several tierprices
        if (priceTiers.length > 1) {
            // case 1: if has no discount
            if (regularPrice.value === finalPrice.value) {
                return (
                    <>
                        {/* case 1 */}
                        <Typography variant="span" type="bold" letter="uppercase" className={styles.noMargin}>
                            {formatPrice(finalPrice.value, finalPrice.currency)}
                        </Typography>
                        <AsLowAsText />
                        <Typography variant="span" letter="uppercase" className={styles.noMargin}>
                            {formatPrice(lowestPriceTier.final_price.value, lowestPriceTier.final_price.currency)}
                        </Typography>
                    </>
                );
            }
            // case 2: if final price is lowest than lowest tier price
            if (finalPrice.value < lowestPriceTier.final_price.value) {
                return (
                    <>
                        {/* case 2 */}
                        <Typography variant="span" letter="uppercase" className={styles.noMargin}>
                            <strike>{formatPrice(regularPrice.value, regularPrice.currency)}</strike>
                        </Typography>
                        <Typography variant="span" type="bold" letter="uppercase" className={styles.noMargin}>
                            {formatPrice(finalPrice.value, finalPrice.currency)}
                        </Typography>
                    </>
                );
            }
            // case 3: if final price is higher than lowest tier price
            return (
                <>
                    {/* case 3 */}
                    <Typography variant="span" letter="uppercase" className={styles.noMargin}>
                        <strike>{formatPrice(regularPrice.value, regularPrice.currency)}</strike>
                    </Typography>
                    <Typography variant="span" type="bold" letter="uppercase" className={styles.noMargin}>
                        {formatPrice(finalPrice.value, finalPrice.currency)}
                    </Typography>
                    <AsLowAsText />
                    <Typography variant="span" letter="uppercase" className={styles.noMargin}>
                        {formatPrice(lowestPriceTier.final_price.value, lowestPriceTier.final_price.currency)}
                    </Typography>
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
                    <Typography variant="span" letter="uppercase" className={styles.noMargin}>
                        <strike>{formatPrice(regularPrice.value, regularPrice.currency)}</strike>
                    </Typography>
                    <Typography variant="span" type="bold" letter="uppercase" className={styles.noMargin}>
                        {formatPrice(firstTierPrice.final_price.value, firstTierPrice.final_price.currency)}
                    </Typography>
                </>
            );
        }
        // case 5: if final price is lower than tier price
        if (finalPrice.value < firstTierPrice.final_price.value) {
            return (
                <>
                    {/* case 5 */}
                    <Typography variant="span" letter="uppercase" className={styles.noMargin}>
                        <strike>{formatPrice(regularPrice.value, regularPrice.currency)}</strike>
                    </Typography>
                    <Typography variant="span" type="bold" letter="uppercase" className={styles.noMargin}>
                        {formatPrice(finalPrice.value, finalPrice.currency)}
                    </Typography>
                </>
            );
        }
        // case 6: if tier price is lower than final price and tier price qty is 1
        if (firstTierPrice.quantity === 1 || finalPrice.value === firstTierPrice.final_price.value) {
            return (
                <>
                    {/* case 6 */}
                    <Typography variant="span" letter="uppercase" className={styles.noMargin}>
                        <strike>{formatPrice(regularPrice.value, regularPrice.currency)}</strike>
                    </Typography>
                    <Typography variant="span" type="bold" letter="uppercase" className={styles.noMargin}>
                        {formatPrice(firstTierPrice.final_price.value, firstTierPrice.final_price.currency)}
                    </Typography>
                </>
            );
        }
        // case 7: if tier price is lower than final price but tier price qty > 1
        return (
            <>
                {/* case 7 */}
                <Typography variant="span" letter="uppercase" className={styles.noMargin}>
                    <strike>{formatPrice(regularPrice.value, regularPrice.currency)}</strike>
                </Typography>
                <Typography variant="span" letter="uppercase" className={styles.noMargin}>
                    {formatPrice(finalPrice.value, finalPrice.currency)}
                </Typography>
                <AsLowAsText />
                <Typography variant="span" type="bold" letter="uppercase" className={styles.noMargin}>
                    {formatPrice(firstTierPrice.final_price.value, firstTierPrice.final_price.currency)}
                </Typography>
            </>
        );
    }

    // else:
    // if there is no tier price

    // case 8: if there is no discount
    if (regularPrice.value === finalPrice.value) {
        return (
            <>
                {/* case 8 */}
                <Typography variant="span" type="bold" letter="uppercase" className={styles.noMargin}>
                    {formatPrice(finalPrice.value, finalPrice.currency)}
                </Typography>
            </>
        );
    }
    // case 9: if has discount
    return (
        <>
            {/* case 9 */}
            <Typography variant="span" letter="uppercase" className={styles.noMargin}>
                <strike>{formatPrice(regularPrice.value, regularPrice.currency)}</strike>
            </Typography>
            <Typography variant="span" type="bold" letter="uppercase" className={styles.noMargin}>
                {formatPrice(finalPrice.value, finalPrice.currency)}
            </Typography>
        </>
    );
};

const OtherProductTypePrice = ({ priceRange }) => {
    const styles = useStyles();
    const regularPrice = priceRange.minimum_price.regular_price;
    const finalPrice = priceRange.minimum_price.final_price;

    if (regularPrice.value === finalPrice.value) {
        return (
            <>
                <Typography variant="span" type="bold" letter="uppercase" className={styles.noMargin}>
                    {formatPrice(finalPrice.value, finalPrice.currency)}
                </Typography>
            </>
        );
    }

    return (
        <>
            {/* case 9 */}
            <Typography variant="span" letter="uppercase" className={styles.noMargin}>
                <strike>{formatPrice(regularPrice.value, regularPrice.currency)}</strike>
            </Typography>
            <Typography variant="span" type="bold" letter="uppercase" className={styles.noMargin}>
                {formatPrice(finalPrice.value, finalPrice.currency)}
            </Typography>
        </>
    );
};

/**
 * Price Generator Component
 * @component
 * @param {array} priceRange - price range from magento GQL including regluar price and final price
 * @returns {object} [priceTiers] - tier prices from magento GQL
 */

const Price = ({
    priceRange = {},
    priceTiers = [],
    productType = 'SimpleProduct',
}) => {
    if (!priceRange) {
        return <>Invalid price</>;
    }

    if (productType === 'SimpleProduct') {
        return (
            <SimpleProductTypePrice
                priceRange={priceRange}
                priceTiers={priceTiers}
            />
        );
    }

    return (
        <OtherProductTypePrice
            priceRange={priceRange}
            priceTiers={priceTiers}
        />
    );
};

export default Price;
