import ConfigurableOption from './ConfigurableOption';
import SimpleOption from './SimpeProduct';
import VirtualOption from './Virtual';
import DownloadOption from './Download';
import BundleOption from './BundleOption';

const OptionItem = (props) => {
    const {
        data, enableConfigurable = true, enableSimple = true,
        enableVirtual = true, enableDownload = true, enableBundle = true,
    } = props;
    const { __typename } = data;
    return (
        <>
            {enableConfigurable && __typename === 'ConfigurableProduct' && (
                <ConfigurableOption
                    {...props}
                />
            )}

            {enableSimple && __typename === 'SimpleProduct' && (
                <SimpleOption
                    {...props}
                />
            )}

            {enableVirtual && __typename === 'VirtualProduct' && (
                <VirtualOption
                    {...props}
                />
            )}

            {enableDownload && __typename === 'BundleProduct' && (
                <BundleOption
                    {...props}
                />
            )}
            {enableBundle && __typename === 'DownloadableProduct' && (
                <DownloadOption
                    {...props}
                />
            )}
        </>
    );
};

export default OptionItem;
