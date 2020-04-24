/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
    Dialog, Fade, Select, MenuItem, FormControl, InputLabel,
} from '@material-ui/core';
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

const renderQty = () => {
    const options = [];
    // eslint-disable-next-line no-plusplus
    for (let item = 1; item <= 10; item++) {
        options.push(<MenuItem key={item} value={item}>{item}</MenuItem>);
    }
    return options;
};

const OptionDialog = (props) => {
    const {
        open, setOpen, t, data: { sku },
        setBanner, setPrice,
    } = props;
    const styles = useStyles();
    const [selected, setSelected] = React.useState({});
    const [qty, setQty] = React.useState(1);

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

    const dataQty = renderQty(qty);
    const handleQty = (event) => {
        setQty(event.target.value);
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
                                : (
                                    <FormControl key={index} className={styles.select}>
                                        <InputLabel htmlFor={`select-${option.label}`}>{`Select ${option.label}`}</InputLabel>
                                        <Select
                                            id={`select-${option.label}`}
                                            value={selected[option.attribute_code]}
                                            onChange={(val) => handleSelect(val, option.attribute_code)}
                                            label={`Select ${option.label}`}
                                        >
                                            {
                                                option.values.map((val, key) => (<MenuItem key={key} value={val.label}>{val.label}</MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>
                                )
                    ))}

                    <div className={styles.qty}>
                        <Typography variant="span">
                            Qty
                        </Typography>
                        <Select defaultValue={1} value={qty} onChange={handleQty} variant="outlined">
                            {
                                dataQty
                            }
                        </Select>

                    </div>
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
