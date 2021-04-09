import { modules } from '@config';
import ConfigurableOption from '../../../../plugin/OptionItem/ConfigurableOption';
import SimpleOption from '../../../../plugin/OptionItem/SimpeProduct';
import VirtualOption from '../../../../plugin/OptionItem/Virtual';
import DownloadOption from '../../../../plugin/OptionItem/Download';
import BundleOption from '../../../../plugin/OptionItem/BundleOption';
import GroupedOption from '../../../../plugin/OptionItem/GroupedProduct';
import CustomizableOption from '../CustomizableOption';

const Options = (props) => {
    const {
        data, price, customizableOptions, setCustomizableOptions,
        errorCustomizableOptions,
    } = props;
    const { __typename } = data;
    return (
        <>
            { modules.product.customizableOptions.enabled && (
                <CustomizableOption
                    {...data}
                    price={price}
                    customizableOptions={customizableOptions}
                    setCustomizableOptions={setCustomizableOptions}
                    errorCustomizableOptions={errorCustomizableOptions}
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
                />
            )}

            {__typename === 'GroupedProduct' && (
                <GroupedOption
                    {...props}
                />
            )}
        </>
    );
};

export default Options;
