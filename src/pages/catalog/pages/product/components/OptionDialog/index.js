/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Dialog, Fade } from '@material-ui/core';
import React from 'react';
import Typography from '@components/Typography';
import Button from '@components/Button';
import CustomRadio from '@components/Forms/Radio';
import SelectColor from '@components/Forms/SelectColor';
import SelectSize from '@components/Forms/SelectSize';
import Router from 'next/router';
import ProductByVariant from '@helpers/productByVariant';
import { getConfigurableProduct } from '../../services/graphql';
import useStyles from './style';

const Transition = React.forwardRef((props, ref) => (
    <Fade ref={ref} {...props} />
));

const OptionDialog = (props) => {
    const {
        open, setOpen, t, data: { sku },
        setBanner, setPrice,
    } = props;
    const styles = useStyles();
    const [selected, setSelected] = React.useState({});

    const { data } = getConfigurableProduct(sku);

    let optionData = [];
    if (data) {
        optionData = data.products.items[0].configurable_options.map((config) => {
            const values = config.values.map((val) => ({
                label: val.label,
                value: val.label,
            }));
            return {
                ...config,
                values,
            };
        });
    }

    const handleSelect = (value, key) => {
        const options = selected;
        options[key] = value;
        setSelected({
            ...selected,
            [key]: value,
        });
        const product = ProductByVariant(options, data.products.items[0].variants);
        const bannerData = product.media_gallery.map((media) => ({
            link: '#',
            imageUrl: media.url,
        }));
        setBanner(bannerData);
        setPrice({
            priceRange: product.price_range,
            priceTiers: product.price_tiers,
            // eslint-disable-next-line no-underscore-dangle
            productType: product.__typename,
        });
    };

    return (
        <Dialog
            fullScreen
            open={open}
            TransitionComponent={Transition}
            onClose={setOpen}
            PaperProps={{
                className: styles.dialog,
            }}
        >
            <div className={styles.root}>
                <div
                    className={styles.bannerContainer}
                    onClick={() => setOpen()}
                />
                <div className={styles.optionContainer}>
                    <Button variant="text" onClick={setOpen} className={styles.btnClose}>
                        <Typography variant="p">Close</Typography>
                    </Button>
                    { optionData.map((option, index) => (
                        option.attribute_code === 'color'
                            ? (
                                <CustomRadio
                                    key={index}
                                    label="Select color"
                                    flex="row"
                                    CustomItem={SelectColor}
                                    value={selected[option.attribute_code]}
                                    valueData={option.values}
                                    onChange={(val) => handleSelect(val, option.attribute_code)}
                                    className={styles.label}
                                    classContainer={styles.center}
                                />
                            )
                            : option.attribute_code === 'size'
                                ? (
                                    <CustomRadio
                                        key={index}
                                        label="Select size"
                                        flex="row"
                                        CustomItem={SelectSize}
                                        value={selected[option.attribute_code]}
                                        valueData={option.values}
                                        onChange={(val) => handleSelect(val, option.attribute_code)}
                                        className={styles.sizeContainer}
                                        classContainer={styles.center}
                                    />
                                )
                                : (<React.Fragment key={index} />)
                    ))}
                    {/* <CustomRadio
                        label="Select color"
                        flex="row"
                        CustomItem={SelectColor}
                        value={color}
                        valueData={colorData}
                        onChange={handleChangeColor}
                        className={styles.label}
                        classContainer={styles.center}
                    />
                    {sizeOptions === ''
                    || sizeOptions.length <= 0
                    || !sizeOptions ? (
                            // eslint-disable-next-line react/jsx-indent
                            <>
                                <Typography
                                    variant="label"
                                    type="bold"
                                    letter="uppercase"
                                >
                                    Select Size
                                </Typography>
                                <Typography variant="p" className={styles.error}>
                                    Sorry! This item is out of stock.
                                </Typography>
                            </>
                        ) : (
                            <>
                                <CustomRadio
                                    label="Select size"
                                    flex="row"
                                    CustomItem={SelectSize}
                                    value={size}
                                    valueData={sizeOptions}
                                    onChange={setSize}
                                    className={styles.sizeContainer}
                                    classContainer={styles.center}
                                />
                                <Button variant="text">
                                    <Typography
                                        variant="p"
                                        letter="capitalize"
                                        decoration="underline"
                                    >
                                        {t('product:viewGuide')}
                                    </Typography>
                                </Button>
                            </>
                        )} */}

                    <div className={styles.footer}>
                        <Button
                            className={styles.btnAddToCard}
                            color="primary"
                            onClick={() => {
                                Router.push('/cart');
                            }}
                        >
                            <Typography
                                align="center"
                                type="regular"
                                letter="capitalize"
                                className={styles.textBtnAddToCard}
                            >
                                {t('product:addToCart')}
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default OptionDialog;
