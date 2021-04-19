/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';
import { modules } from '@config';
// import Router from 'next/router';
import React from 'react';
import ConfigurableOption from '../../../../plugin/OptionItem/ConfigurableOption';
import SimpleOption from '../../../../plugin/OptionItem/SimpeProduct';
import VirtualOption from '../../../../plugin/OptionItem/Virtual';
import DownloadOption from '../../../../plugin/OptionItem/Download';
import BundleOption from '../../../../plugin/OptionItem/BundleOption';
import GroupedOption from '../../../../plugin/OptionItem/GroupedProduct';
import CustomizableOption from '../CustomizableOption';
import useStyles from './style';

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
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default OptionDialog;
