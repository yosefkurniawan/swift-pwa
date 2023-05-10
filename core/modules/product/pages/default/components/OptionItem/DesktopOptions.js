import { modules } from '@config';
import dynamic from 'next/dynamic';

const ConfigurableOption = dynamic(() => import('@plugin_optionitem/ConfigurableOption'));
const SimpleOption = dynamic(() => import('@plugin_optionitem/SimpleProduct'));
const VirtualOption = dynamic(() => import('@plugin_optionitem/Virtual'));
const DownloadOption = dynamic(() => import('@plugin_optionitem/Download'));
const BundleOption = dynamic(() => import('@plugin_optionitem/BundleOption'));
const GroupedOption = dynamic(() => import('@plugin_optionitem/GroupedProduct'));
const CustomizableOption = dynamic(() => import('@plugin_customizableitem'));
const AwGiftCardProduct = dynamic(() => import('@plugin_optionitem/AwGiftCardProduct'));

const Options = (props) => {
    const {
        data, price, customizableOptions, setCustomizableOptions,
        errorCustomizableOptions, additionalPrice, setAdditionalPrice, priceData,
    } = props;
    const { __typename } = data;
    return (
        <>
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
                />
            )}

            {__typename === 'SimpleProduct' && (
                <SimpleOption
                    {...props}
                />
            )}

            {__typename === 'VirtualProduct' && (
                <VirtualOption
                    {...props}
                />
            )}

            {__typename === 'BundleProduct' && (
                <BundleOption
                    {...props}
                />
            )}
            {__typename === 'DownloadableProduct' && (
                <DownloadOption
                    {...props}
                    priceData={priceData}
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
        </>
    );
};

export default Options;
