/* eslint-disable no-plusplus */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TagManager from 'react-gtm-module';
import Typography from '@components/Typography';
import Arrow from '@material-ui/icons/ArrowDropDown';
import Radio from '@components/Forms/Radio';
import Skeleton from '@material-ui/lab/Skeleton';
import RadioItem from '../RadioDeliveryItem';
import gqlService from '../../services/graphql';

import {
    ExpanDetailStyle,
    ExpanPanelStyle,
    ExpanSummaryStyle,
} from './style';

const ExpansionPanel = withStyles(ExpanPanelStyle)(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles(ExpanSummaryStyle)(
    MuiExpansionPanelSummary,
);

const ExpansionPanelDetails = withStyles(ExpanDetailStyle)(
    MuiExpansionPanelDetails,
);

const Loader = () => (
    <>
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
    </>
);

export default function CustomizedExpansionPanels({
    checkout,
    setCheckout,
    updateFormik,
    handleOpenMessage,
    t,
    styles,
    storeConfig,
}) {
    const [expanded, setExpanded] = React.useState(null);

    const { loading, data, selected } = checkout;
    const [setPaymentMethod] = gqlService.setPaymentMethod({ onError: () => {} });
    let content;

    const handlePayment = async (val) => {
        if (val) {
            const { cart } = checkout.data;
            let state = { ...checkout };
            state.selected.payment = val;
            window.backdropLoader(true);
            setCheckout(state);

            const result = await setPaymentMethod({ variables: { cartId: cart.id, code: val } });

            state = { ...checkout };

            if (result) {
                state.data.cart = result.data.setPaymentMethodOnCart.cart;
                updateFormik(result.data.setPaymentMethodOnCart.cart);
            } else {
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:problemConnection'),
                });
            }
            window.backdropLoader(false);
            setCheckout(state);

            const selectedPayment = data.paymentMethod.filter((item) => item.code === val);
            const dataLayer = {
                event: 'checkout',
                ecommerce: {
                    checkout: {
                        actionField: { step: 3, option: selectedPayment[0].title, action: 'checkout' },
                        products: cart.items.map(({ quantity, product, prices }) => ({
                            name: product.name,
                            id: product.sku,
                            price: JSON.stringify(prices.price.value),
                            category: product.categories.length > 0 ? product.categories[0].name : '',
                            list: product.categories.length > 0 ? product.categories[0].name : '',
                            quantity: JSON.stringify(quantity),
                            dimension4: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                            dimension5: '',
                            dimension6: '',
                            dimension7: prices.discount ? 'YES' : 'NO',
                        })),
                    },
                    currencyCode: storeConfig.base_currency_code || 'IDR',
                },
            };
            const dataLayerOption = {
                event: 'checkoutOption',
                ecommerce: {
                    currencyCode: storeConfig.base_currency_code || 'IDR',
                    checkout_option: {
                        actionField: { step: 3, option: selectedPayment[0].title, action: 'checkout_option' },
                    },
                },
            };
            TagManager.dataLayer({
                dataLayer,
            });
            TagManager.dataLayer({
                dataLayer: dataLayerOption,
            });
        }
    };

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    if (loading.payment || loading.shipping || loading.all) {
        content = <Loader />;
    } else if (data.cart.prices.grand_total.value === 0) {
        content = <Typography variant="p">{t('checkout:noNeedPayment')}</Typography>;
    } else if (data.paymentMethod.length !== 0 && storeConfig.payments_configuration) {
        let paymentConfig = JSON.parse(`${storeConfig.payments_configuration}`);
        const groups = paymentConfig ? Object.keys(paymentConfig) : [];
        paymentConfig = groups.map((key) => {
            const groupData = [];
            let config = paymentConfig[key];
            config = config.split(',');
            for (let idx = 0; idx < data.paymentMethod.length; idx++) {
                const element = data.paymentMethod[idx];
                for (let idc = 0; idc < config.length; idc++) {
                    if (config[idc] === element.code) {
                        groupData.push(element);
                    }
                }
            }
            return {
                group: key,
                data: groupData,
            };
        });
        content = (
            <div>
                <Typography variant="p">{t('checkout:paymentSubtitle')}</Typography>
                {paymentConfig && (
                    <div className={styles.paymentExpansionContainer}>
                        {paymentConfig.map((item, index) => {
                            if (item.data.length !== 0) {
                                return (
                                    <ExpansionPanel
                                        expanded={expanded === index}
                                        onChange={handleChange(index)}
                                        key={index}
                                    >
                                        <ExpansionPanelSummary
                                            aria-controls="panel1d-content"
                                            id="panel1d-header"
                                            expandIcon={<Arrow className={styles.icon} />}
                                        >
                                            <Typography letter="uppercase" variant="span" type="bold">
                                                {item.group.replace('pg-', '')}
                                            </Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            {item.data.length !== 0 ? (
                                                <Radio
                                                    value={selected.payment}
                                                    onChange={handlePayment}
                                                    valueData={item.data}
                                                    CustomItem={RadioItem}
                                                    propsItem={{
                                                        borderBottom: false,
                                                        RightComponent: true,
                                                    }}
                                                />
                                            ) : null}
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                );
                            }
                            return null;
                        })}
                    </div>
                )}
            </div>
        );
    } else if (checkout.selected.delivery === 'pickup') {
        content = <Typography variant="p">{t('checkout:noPaymentPickup')}</Typography>;
    } else {
        content = <Typography variant="p">{t('checkout:noPayment')}</Typography>;
    }

    return (
        <div className={styles.block}>
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:payment')}
            </Typography>
            <div>{content}</div>
        </div>
    );
}
