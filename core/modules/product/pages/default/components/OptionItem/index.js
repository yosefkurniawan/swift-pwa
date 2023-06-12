/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';
import { modules } from '@config';
import React from 'react';
import useStyles from '@core_modules/product/pages/default/components/OptionItem/style';
import dynamic from 'next/dynamic';

const ConfigurableOption = dynamic(() => import('@plugin_optionitem/ConfigurableOption'));
const SimpleOption = dynamic(() => import('@plugin_optionitem/SimpleProduct'));
const VirtualOption = dynamic(() => import('@plugin_optionitem/Virtual'));
const DownloadOption = dynamic(() => import('@plugin_optionitem/Download'));
const BundleOption = dynamic(() => import('@plugin_optionitem/BundleOption'));
const GroupedOption = dynamic(() => import('@plugin_optionitem/GroupedProduct'));
const CustomizableOption = dynamic(() => import('@plugin_customizableitem'));
const AwGiftCardProduct = dynamic(() => import('@plugin_optionitem/AwGiftCardProduct'));

const Transition = React.forwardRef((props, ref) => (
    <Fade ref={ref} {...props} />
));

const OptionDialog = (props) => {
    const {
        open,
        setOpen,
        data,
        price, customizableOptions, setCustomizableOptions,
        errorCustomizableOptions, additionalPrice, setAdditionalPrice,
    } = props;
    const { __typename } = data;
    const styles = useStyles();
    const [loading, setLoading] = React.useState(false);

    return (
        <>
            <Dialog
                fullScreen
                open={open}
                TransitionComponent={Transition}
                PaperProps={{
                    className: styles.dialog,
                }}
            >
                <div className={styles.root}>
                    <div
                        className={styles.bannerContainer}
                        onClick={() => !loading && setOpen()}
                    />
                    <div className={styles.optionContainer}>
                        { modules.product.customizableOptions.enabled && (
                            <CustomizableOption
                                {...data}
                                price={price}
                                showCustomizableOption
                                customizableOptions={customizableOptions}
                                setCustomizableOptions={setCustomizableOptions}
                                errorCustomizableOptions={errorCustomizableOptions}
                                additionalPrice={additionalPrice}
                                setAdditionalPrice={setAdditionalPrice}
                            />
                        ) }
                        {__typename === 'ConfigurableProduct' && (
                            <ConfigurableOption
                                {...props}
                                loading={loading}
                                setLoading={setLoading}
                            />
                        )}

                        {__typename === 'BundleProduct' && (
                            <BundleOption
                                {...props}
                                loading={loading}
                                setLoading={setLoading}
                            />
                        )}

                        {__typename === 'SimpleProduct' && (
                            <SimpleOption
                                {...props}
                                loading={loading}
                                setLoading={setLoading}
                            />
                        )}

                        {__typename === 'VirtualProduct' && (
                            <VirtualOption
                                {...props}
                                loading={loading}
                                setLoading={setLoading}
                            />
                        )}

                        {__typename === 'DownloadableProduct' && (
                            <DownloadOption
                                {...props}
                                loading={loading}
                                setLoading={setLoading}
                            />
                        )}
                        {__typename === 'GroupedProduct' && (
                            <GroupedOption
                                {...props}
                            />
                        )}
                        {__typename === 'AwGiftCardProduct' && (
                            <AwGiftCardProduct {...props} />
                        )}
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default OptionDialog;
