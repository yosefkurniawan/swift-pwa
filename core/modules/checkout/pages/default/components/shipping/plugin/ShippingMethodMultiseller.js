/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
import Typography from '@common_typography';
import DeliveryItem from '@core_modules/checkout/components/radioitem';
import RadioMultiseller from '@core_modules/checkout/pages/default/components/shipping/plugin/Radio';
import useStyles from '@core_modules/checkout/pages/default/components/style';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { withStyles } from '@material-ui/core/styles';
import Arrow from '@material-ui/icons/ArrowDropDown';
import Alert from '@material-ui/lab/Alert';
// import propTypes from 'prop-types';
import React from 'react';

import {
    ExpanDetailStyle, ExpanPanelStyle, ExpanSummaryStyle
} from '../style';

const Accordion = withStyles(ExpanPanelStyle)(MuiAccordion);

const AccordionSummary = withStyles(ExpanSummaryStyle)(MuiAccordionSummary);

const AccordionDetails = withStyles(ExpanDetailStyle)(MuiAccordionDetails);

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

function ShippingMethodMultiseller({
    seller = [],
    itemActive = false,
    storeConfig = [],
    selected = [],
    handleShipping = () => { },
    t = () => { },
}) {
    const error = [];
    const [expandedMulti, setExpandedMulti] = React.useState(null);
    const [expandedActiveMulti, setExpandedActiveMulti] = React.useState(true);
    const handleChangeMulti = (panel) => (event, newExpanded) => {
        setExpandedActiveMulti(false);
        setExpandedMulti(newExpanded ? panel : false);
    };
    const styles = useStyles();
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
                                                <RadioMultiseller
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
                                                    isShipping
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
}

// ShippingMethodMultiseller.propTypes = {
//     valueData: propTypes.array.isRequired,
//     onChange: propTypes.func,
//     value: propTypes.array,
//     name: propTypes.string,
//     ariaLabel: propTypes.string,
//     label: propTypes.string,
//     CustomItem: propTypes.element.isRequired,
//     className: propTypes.object,
//     classContainer: propTypes.object,
//     classItem: propTypes.object,
//     flex: propTypes.string,
//     error: propTypes.bool,
//     errorMessage: propTypes.string,
//     propsItem: propTypes.object,
//     disabled: propTypes.bool,
//     ComponentOptional: propTypes.func,
//     storeConfig: propTypes.object.isRequired,
//     isShipping: propTypes.bool,
// };

// ShippingMethodMultiseller.defaultProps = {
//     onChange: () => { },
//     value: '',
//     name: 'radio',
//     ariaLabel: 'radio',
//     label: '',
//     className: {},
//     classContainer: {},
//     classItem: {},
//     flex: 'column',
//     error: false,
//     errorMessage: '',
//     propsItem: {},
//     disabled: false,
//     ComponentOptional: () => { },
//     isShipping: false,
// };

export default ShippingMethodMultiseller;
