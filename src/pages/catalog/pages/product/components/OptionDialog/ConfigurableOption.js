/* eslint-disable no-nested-ternary */
import CustomRadio from '@components/Forms/Radio';
import SelectColor from '@components/Forms/SelectColor';
import SelectSize from '@components/Forms/SelectSize';
import Typography from '@components/Typography';
import {
    MenuItem, Select,
} from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductByVariant from '@helpers/productByVariant';
import { setCountCart } from '@stores/actions/cart';
import { GraphCart } from '@services/graphql';
import { getToken } from '@helpers/token';
import { getCartId, setCartId } from '@helpers/cartId';
import { addConfigProductsToCart, getConfigurableProduct } from '../../services/graphql';
import { setConfigurable, setProductSelected } from '../../redux/action';
import Footer from './Footer';
import useStyles from './style';

export default (props) => {
    const {
        setBanner,
        setPrice,
        t,
        data: { __typename, sku },
        setMessage,
        setOpen,
        loading,
        setLoading,
    } = props;
    const styles = useStyles();
    const dispatch = useDispatch();

    const productState = useSelector((state) => state.product);

    const [qty, setQty] = React.useState(1);
    const handleQty = (event) => {
        setQty(event.target.value);
    };

    const { data } = getConfigurableProduct(sku);

    let optionData = [];
    if (data) {
        optionData = data.products.items[0].configurable_options.map(
            (config) => {
                const values = config.values.map((val) => ({
                    label: val.label,
                    value: val.label,
                }));
                return {
                    ...config,
                    values,
                };
            },
        );
    }

    const selected = productState.selectConfigurable;

    const handleSelect = async (value, key) => {
        const options = productState.selectConfigurable;
        options[key] = value;
        dispatch(setConfigurable({
            [key]: value,
        }));
        const product = await ProductByVariant(
            options,
            data.products.items[0].variants,
        );
        dispatch(setProductSelected(product));
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
    let cartId = '';
    let tokenCustomer = '';

    if (typeof window !== 'undefined') {
        tokenCustomer = getToken();
        cartId = getCartId();
    }


    const [addCartConfig] = addConfigProductsToCart(tokenCustomer);
    const [getGuestCartId] = GraphCart.getGuestCartId();

    const [error, setError] = React.useState({});

    const handleAddToCart = async () => {
        setLoading(true);
        const errorMessage = {
            variant: 'error',
            text: t('product:failedAddCart'),
            open: true,
        };
        const errorData = {};
        // eslint-disable-next-line array-callback-return
        optionData.map((option) => {
            if (selected[option.attribute_code] === '' || !selected[option.attribute_code]) {
                errorData[option.attribute_code] = `${option.attribute_code} ${t('validate:required')}`;
            }
        });
        setError(errorData);
        if (JSON.stringify(errorData) === '{}') {
            if (!cartId || cartId === '' || cartId === undefined) {
                if (tokenCustomer === '' || !tokenCustomer) {
                    await getGuestCartId()
                        .then((res) => {
                            const token = res.data.createEmptyCart;
                            cartId = token;
                            setCartId(token);
                        })
                        .catch(() => {
                            setLoading(false);
                            setMessage(errorMessage);
                        });
                }
            }

            if (__typename === 'ConfigurableProduct') {
                const variables = {
                    cartId,
                    sku: productState.product.sku,
                    qty: parseFloat(qty),
                    parentSku: sku,
                };
                addCartConfig({
                    variables,
                }).then((res) => {
                    dispatch(
                        setCountCart(
                            res.data.addConfigurableProductsToCart.cart.total_quantity,
                        ),
                    );
                    setMessage({ variant: 'success', text: t('product:successAddCart'), open: true });
                    setLoading(false);
                    setOpen(false);
                }).catch(() => {
                    setLoading(false);
                    setMessage(errorMessage);
                });
            }
        }
    };

    const classItem = styles.stylesItemOption;

    return (
        <>
            {optionData.map((option, index) => (option.attribute_code === 'color' ? (
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
                    classItem={classItem}
                    error={!!error[option.attribute_code] && !selected[option.attribute_code]}
                    errorMessage={error[option.attribute_code] ? error[option.attribute_code] : ''}
                    disabled={loading}
                />
            ) : option.attribute_code === 'size' ? (
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
                    classItem={classItem}
                    error={!!error[option.attribute_code] && !selected[option.attribute_code]}
                    errorMessage={error[option.attribute_code] ? error[option.attribute_code] : ''}
                    disabled={loading}
                />
            ) : (
                <div key={index} className={styles.select}>
                    <Typography align="center" variant="label" type="bold" letter="uppercase">
                        {`Select ${option.label}`}
                    </Typography>
                    <Select
                        value={selected[option.attribute_code] || ''}
                        onChange={(val) => handleSelect(val.target.value, option.attribute_code)}
                        disabled={loading}
                    >
                        {option.values.map((val, key) => (
                            <MenuItem key={key} value={val.label}>
                                {val.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {
                        error[option.attribute_code] && !selected[option.attribute_code] && (
                            <Typography variant="p" color="red">
                                {error[option.attribute_code]}
                            </Typography>
                        )
                    }
                </div>
            )))}
            <Footer
                qty={qty}
                handleAddToCart={handleAddToCart}
                handleQty={handleQty}
                t={t}
                loading={loading}
            />
        </>
    );
};
