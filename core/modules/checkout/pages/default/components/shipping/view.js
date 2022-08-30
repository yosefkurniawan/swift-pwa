/* eslint-disable arrow-body-style */
/* eslint-disable array-callback-return */
/* eslint-disable comma-dangle */
import { useApolloClient } from '@apollo/client';
import Radio from '@common_forms/Radio';
import Typography from '@common_typography';
import DeliveryItem from '@core_modules/checkout/components/radioitem';
import useStyles from '@core_modules/checkout/pages/default/components/style';
// import gqlService from '@core_modules/checkout/services/graphql';
import * as Schema from '@core_modules/checkout/services/graphql/schema';
import { formatPrice } from '@helper_currency';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { withStyles } from '@material-ui/core/styles';
import Arrow from '@material-ui/icons/ArrowDropDown';
import Alert from '@material-ui/lab/Alert';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

import {
    ExpanDetailStyle, ExpanPanelStyle, ExpanSummaryStyle
} from './style';

const Accordion = withStyles(ExpanPanelStyle)(MuiAccordion);

const AccordionSummary = withStyles(ExpanSummaryStyle)(MuiAccordionSummary);

const AccordionDetails = withStyles(ExpanDetailStyle)(MuiAccordionDetails);

const Loader = () => (
    <>
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
    </>
);

const ShippingGroupIcon = (props) => {
    const { baseMediaUrl, src } = props;
    const fallbacks = [`${baseMediaUrl}checkout/shipping/shipping-${src.replace('sg-', '')}.svg`, null];
    const styles = useStyles();

    // check if image exist on the backoffice, otherwise use fallback image from PWA
    const [imageSrc, setImageSrc] = React.useState(`./assets/img/shipping-${src.replace('sg-', '')}.svg`);
    const [fallbackImageIndex, setFallbackImageIndex] = React.useState(0);

    // set image fallback url
    const getFallbackImageSrc = () => {
        if (fallbackImageIndex > fallbacks.length) {
            return;
        }
        setImageSrc(fallbacks[fallbackImageIndex]);
        setFallbackImageIndex(fallbackImageIndex + 1);
    };

    return (
        <>
            {(imageSrc && (
                <img
                    className={styles.shippingGroupStyleIcon}
                    src={imageSrc}
                    alt={src.replace('sg-', '')}
                    onError={() => getFallbackImageSrc()}
                />
            ))
                || ''}
        </>
    );
};

const ShippingView = (props) => {
    const styles = useStyles();
    const {
        isOnlyVirtualProductOnCart, checkout, storeConfig, loading, selected,
        handleShipping, data, t, shippingMethodList,
    } = props;
    let content;
    const unique = [];
    const [expanded, setExpanded] = React.useState(null);
    const [expandedActive, setExpandedActive] = React.useState(true);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpandedActive(false);
        setExpanded(newExpanded ? panel : false);
    };
    // console.log('checkout data from shipping component', checkout);
    // const [getSeller, { data: dataSeller }] = gqlService.getSeller();
    const [expandedMulti, setExpandedMulti] = React.useState(null);
    const [expandedActiveMulti, setExpandedActiveMulti] = React.useState(true);
    const [dataShippingMethods, setDataShippingMethods] = React.useState(null);
    const [dataShippingMethodsModified, setDataShippingMethodsModified] = React.useState(null);
    const handleChangeMulti = (panel) => (event, newExpanded) => {
        setExpandedActiveMulti(false);
        setExpandedMulti(newExpanded ? panel : false);
    };

    const apolloClient = useApolloClient();

    React.useEffect(() => {
        console.log(data.shippingMethods);
        if (data.shippingMethods.length > 0) {
            setDataShippingMethods(() => ({ ...dataShippingMethods, shippingMethods: data.shippingMethods }));
        }
    }, [data.shippingMethods]);

    React.useEffect(() => {
        if (dataShippingMethods) {
            console.log(dataShippingMethods);
            const newArray = dataShippingMethods.shippingMethods.map(async (item) => {
                const sellerDataInfo = await apolloClient.query({ query: Schema.getSeller, variables: { sellerId: parseInt(item.seller_id, 10) } })
                    .then((res) => {
                        console.log('res', res);
                        return {
                            ...item,
                            seller_name: res.data.getSeller[0].name,
                            seller_city: res.data.getSeller[0].city.split(',')[0],
                        };
                    });
                return ({
                    ...sellerDataInfo,
                });
            });
            if (newArray) {
                console.log('new array', newArray);
                setDataShippingMethodsModified(() => ({ ...dataShippingMethodsModified, newArray }));
            }
        }
    }, [dataShippingMethods]);

    if (checkout.selected.delivery === 'pickup') {
        const price = formatPrice(0, storeConfig.base_currency_code || 'IDR');
        content = <DeliveryItem value={{ price }} label={t('checkout:pickupStore')} selected borderBottom={false} />;
    } else if (checkout.selected.delivery === 'instore') {
        const price = formatPrice(0, storeConfig.base_currency_code || 'IDR');
        content = <DeliveryItem value={{ price }} label={t('checkout:instorePickup')} selected borderBottom={false} />;
    } else if (loading.shipping || loading.addresses || loading.all) {
        content = <Loader />;
    } else if (data.shippingMethods.length !== 0) {
        const available = data.shippingMethods;
        const config = shippingMethodList && shippingMethodList.storeConfig
            ? JSON.parse(`${shippingMethodList.storeConfig.shipments_configuration}`) : {};
        const group = config ? Object.keys(config) : [];
        const sellerGroup = [];

        const shipping = [];
        if (storeConfig.enable_oms_multiseller === '1') {
            for (let index = 0; index < group.length; index += 1) {
                const groupData = [];
                const key = group[index];
                let cnf = config[key];
                cnf = cnf.replaceAll(' ', '-').split(',');

                // create group data if same label on config
                if (storeConfig.enable_oms_multiseller === '1') {
                    data.shippingMethods.map((avx) => {
                        sellerGroup.push({ seller_id: avx.seller_id, data: [] });
                        for (let idx = 0; idx < avx.available_shipping_methods.length; idx += 1) {
                            const element = avx.available_shipping_methods[idx];
                            const identifier = `${element.value.replaceAll(' ', '-')}`;

                            for (let idc = 0; idc < cnf.length; idc += 1) {
                                // check if shipping method already exist on groupData
                                const checkShipping = groupData.find(
                                    (x) => x.method_code === element.method_code
                                        && x.carrier_code === element.carrier_code
                                        && x.carrier_title === element.carrier_title
                                        && x.seller_id === avx.seller_id,
                                );

                                if (identifier.match(new RegExp(`^${cnf[idc]}`, 'i')) !== null && !checkShipping) {
                                    groupData.push({
                                        ...element,
                                        disabled: !element.available,
                                        seller_id: avx.seller_id,
                                        value: `${element.value}_${avx.seller_id}`,
                                    });
                                }
                            }
                        }
                    });
                } else {
                    for (let idx = 0; idx < available.length; idx += 1) {
                        const element = available[idx];
                        const identifier = `${element.value.replaceAll(' ', '-')}`;

                        for (let idc = 0; idc < cnf.length; idc += 1) {
                            // check if shipping method already exist on groupData
                            const checkShipping = groupData.find(
                                (x) => x.method_code === element.method_code
                                    && x.carrier_code === element.carrier_code
                                    && x.carrier_title === element.carrier_title,
                            );

                            if (identifier.match(new RegExp(`^${cnf[idc]}`, 'i')) !== null && !checkShipping) {
                                groupData.push({
                                    ...element,
                                    disabled: !element.available,
                                });
                            }
                        }
                    }
                }

                if (groupData.length > 0) {
                    // ad active key if on group data selected payment method
                    if (storeConfig.enable_oms_multiseller === '1') {
                        shipping.push({
                            group: key,
                            data: groupData,
                        });
                    } else {
                        let active = false;
                        if (selected.shipping) {
                            for (let idx = 0; idx < groupData.length; idx += 1) {
                                const element = groupData[idx];
                                const activeIdentifer = `${element.carrier_code}_${element.method_code}`;
                                if (activeIdentifer === selected.shipping) {
                                    active = true;
                                }
                            }
                        }
                        shipping.push({
                            group: key,
                            data: groupData,
                            active,
                        });
                    }
                }
            }
            // console.log('shipping groupData', shipping);
            // console.log('seller group', sellerGroup);
        } else {
            for (let index = 0; index < group.length; index += 1) {
                const groupData = [];
                const key = group[index];
                let cnf = config[key];
                cnf = cnf.replaceAll(' ', '-').split(',');

                // create group data if same label on config
                for (let idx = 0; idx < available.length; idx += 1) {
                    const element = available[idx];
                    const identifier = `${element.value.replaceAll(' ', '-')}`;

                    for (let idc = 0; idc < cnf.length; idc += 1) {
                        // check if shipping method already exist on groupData
                        const checkShipping = groupData.find(
                            (x) => x.method_code === element.method_code
                                && x.carrier_code === element.carrier_code
                                && x.carrier_title === element.carrier_title,
                        );

                        if (identifier.match(new RegExp(`^${cnf[idc]}`, 'i')) !== null && !checkShipping) {
                            groupData.push({
                                ...element,
                                disabled: !element.available,
                            });
                        }
                    }
                }

                if (groupData.length > 0) {
                    // ad active key if on group data selected payment method
                    let active = false;
                    if (selected.shipping) {
                        for (let idx = 0; idx < groupData.length; idx += 1) {
                            const element = groupData[idx];
                            const activeIdentifer = `${element.carrier_code}_${element.method_code}`;
                            if (activeIdentifer === selected.shipping) {
                                active = true;
                            }
                        }
                    }
                    shipping.push({
                        group: key,
                        data: groupData,
                        active,
                    });
                }
            }
        }
        const index = data.shippingMethods.findIndex((x) => x.carrier_code === 'pickup');
        if (index >= 0) {
            data.shippingMethods.splice(index, 1);
        }

        // remove instore carrier_code from reguler shipping method
        const regulerIndex = shipping.findIndex((ship) => ship.group === 'sg-reguler');
        if (regulerIndex !== -1) {
            const removeInstore = shipping[regulerIndex].data.filter((item) => item.carrier_code !== 'instore');
            shipping[regulerIndex].data = removeInstore;
        }
        if (shipping.length > 0) {
            const uniqueSellerGroup = [];
            if (storeConfig.enable_oms_multiseller === '1') {
                sellerGroup.filter((seller) => {
                    const isDuplicate = uniqueSellerGroup.includes(seller.seller_id);

                    if (!isDuplicate) {
                        uniqueSellerGroup.push(seller.seller_id);
                        return true;
                    }

                    return false;
                });
                console.log(uniqueSellerGroup);

                uniqueSellerGroup.map((seller) => {
                    const sellerDataInfo = apolloClient.query({ query: Schema.getSeller, variables: { sellerId: parseInt(seller, 10) } })
                        .then(({ data: resData }) => resData);
                    // console.log(sellerDataInfo && sellerDataInfo);
                    const sellerData = shipping.map((ship) => ({
                        data: ship.data.filter((item) => item.seller_id === seller),
                        group: ship.group,
                    }));
                    unique.push({
                        seller_id: seller,
                        seller_name: sellerDataInfo.length > 0 ? sellerDataInfo[0].getSeller[0].name : 'Seller Name',
                        seller_city: sellerDataInfo.length > 0 ? sellerDataInfo[0].getSeller[0].city.split(',')[0] : 'Seller City',
                        sellerData
                    });
                });
                console.log(unique);
                // console.log('shipping below unique', shipping);
            }
            // check if have active on group data by default selected if
            let itemActive = false;
            const error = [];
            for (let idx = 0; idx < shipping.length; idx += 1) {
                const element = shipping[idx];
                if (element.active) {
                    itemActive = true;
                }
                if (element.data && element.data.length > 0) {
                    element.data.forEach((dt) => {
                        if (dt.error_message) {
                            error.push(dt.error_message);
                        }
                    });
                }
            }
            // const [expandedMulti, setExpandedMulti] = React.useState(null);
            // const [expandedActiveMulti, setExpandedActiveMulti] = React.useState(true);
            // const handleChangeMulti = (panel) => (event, newExpanded) => {
            //     setExpandedActiveMulti(false);
            //     setExpandedMulti(newExpanded ? panel : false);
            // };
            if (storeConfig.enable_oms_multiseller === '1') {
                content = unique.map((seller, keySeller) => {
                    return (
                        <>
                            <Typography letter="uppercase" variant="span" type="bold">
                                {`${seller.seller_name} - ${seller.seller_city}`}
                            </Typography>
                            <div className="column">
                                <div className={styles.paymentExpansionContainer}>
                                    {seller.sellerData.map((item, keyIndex) => {
                                        if (item.data.length !== 0) {
                                            return (
                                                <Accordion
                                                    expanded={
                                                        expandedMulti === keyIndex // if key index same with expanded active
                                                        || (item.active && expandedActiveMulti) // expand if item active and not change expand
                                                        || (!itemActive && expandedActiveMulti && keyIndex === 0)
                                                    } // if dont have item active, set index 0 to active
                                                    onChange={handleChangeMulti(keyIndex)}
                                                    key={keyIndex}
                                                >
                                                    <AccordionSummary
                                                        aria-controls="panel1d-content"
                                                        id={`panel-${item.group}`}
                                                        expandIcon={<Arrow className={styles.icon} />}
                                                        IconButtonProps={{
                                                            className: 'checkout-shippingGroupping-expand',
                                                        }}
                                                    >
                                                        <div className={styles.labelAccordion}>
                                                            <ShippingGroupIcon src={item.group} baseMediaUrl={storeConfig.base_media_url} />
                                                            <Typography letter="uppercase" variant="span" type="bold">
                                                                {t(`checkout:shippingGrouping:${item.group.replace('sg-', '')}`)
                                                                    === `shippingGrouping.${item.group.replace('sg-', '')}`
                                                                    ? item.group.replace('sg-', '')
                                                                    : t(`checkout:shippingGrouping:${item.group.replace('sg-', '')}`)}
                                                            </Typography>
                                                        </div>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <div className="column">
                                                            {item.data.length !== 0 ? (
                                                                <Radio
                                                                    value={selected.shipping[keySeller]}
                                                                    onChange={handleShipping}
                                                                    valueData={item.data}
                                                                    CustomItem={DeliveryItem}
                                                                    classContainer={styles.radioShiping}
                                                                    storeConfig={storeConfig}
                                                                    propsItem={{
                                                                        borderBottom: false,
                                                                        classContent: styles.listShippingGroup,
                                                                    }}
                                                                />
                                                            ) : null}
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>

                                <div className={styles.listError}>
                                    {error
                                        && error.length > 0
                                        && error.map((msg, key) => (
                                            <Alert key={key} style={{ fontSize: 10, marginBottom: 5 }} severity="error">
                                                {msg}
                                            </Alert>
                                        ))}
                                </div>
                            </div>
                        </>
                    );
                });
            } else {
                content = (
                    <div className="column">
                        <div className={styles.paymentExpansionContainer}>
                            {shipping.map((item, keyIndex) => {
                                if (item.data.length !== 0) {
                                    return (
                                        <Accordion
                                            expanded={
                                                expanded === keyIndex // if key index same with expanded active
                                                || (item.active && expandedActive) // expand if item active and not change expand
                                                || (!itemActive && expandedActive && keyIndex === 0)
                                            } // if dont have item active, set index 0 to active
                                            onChange={handleChange(keyIndex)}
                                            key={keyIndex}
                                        >
                                            <AccordionSummary
                                                aria-controls="panel1d-content"
                                                id={`panel-${item.group}`}
                                                expandIcon={<Arrow className={styles.icon} />}
                                                IconButtonProps={{
                                                    className: 'checkout-shippingGroupping-expand',
                                                }}
                                            >
                                                <div className={styles.labelAccordion}>
                                                    <ShippingGroupIcon src={item.group} baseMediaUrl={storeConfig.base_media_url} />
                                                    <Typography letter="uppercase" variant="span" type="bold">
                                                        {t(`checkout:shippingGrouping:${item.group.replace('sg-', '')}`)
                                                            === `shippingGrouping.${item.group.replace('sg-', '')}`
                                                            ? item.group.replace('sg-', '')
                                                            : t(`checkout:shippingGrouping:${item.group.replace('sg-', '')}`)}
                                                    </Typography>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="column">
                                                    {item.data.length !== 0 ? (
                                                        <Radio
                                                            value={selected.shipping}
                                                            onChange={handleShipping}
                                                            valueData={item.data}
                                                            CustomItem={DeliveryItem}
                                                            classContainer={styles.radioShiping}
                                                            storeConfig={storeConfig}
                                                            propsItem={{
                                                                borderBottom: false,
                                                                classContent: styles.listShippingGroup,
                                                            }}
                                                        />
                                                    ) : null}
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        <div className={styles.listError}>
                            {error
                                && error.length > 0
                                && error.map((msg, key) => (
                                    <Alert key={key} style={{ fontSize: 10, marginBottom: 5 }} severity="error">
                                        {msg}
                                    </Alert>
                                ))}
                        </div>
                    </div>
                );
            }
        } else {
            content = (
                <Radio
                    value={selected.shipping}
                    onChange={handleShipping}
                    classContainer={styles.listShipping}
                    CustomItem={DeliveryItem}
                    valueData={data.shippingMethods}
                />
            );
        }
    } else {
        content = <Typography variant="p">{t('checkout:noShipping')}</Typography>;
    }

    return isOnlyVirtualProductOnCart ? null : (
        <div className={styles.block} id="checkoutShipping">
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:shippingMethod')}
            </Typography>
            {dataShippingMethodsModified && console.log(dataShippingMethodsModified)}
            {content}
        </div>
    );
};

export default ShippingView;
